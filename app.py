
from flask import Flask, request, jsonify, send_file
from flask_mysqldb import MySQL
from flask_cors import CORS
import pandas as pd
from io import BytesIO
import math

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '@vrindakr051204'
app.config['MYSQL_DB'] = 'business_plan'

mysql = MySQL(app)

last_used_table = None

@app.route('/submit', methods=['POST'])
def submit_data():
    try:
        global last_used_table
        if not request.is_json:
            return jsonify({'error': 'Invalid content type, expected application/json'}), 400
        data = request.get_json()
        print(f"Sector: {data.get('sector')}, Section: {data.get('section')}")  # Debugging



        required_fields = [
            'customer', 'model', 'section', 'plan', 'std_uph', 'existing_lines',
            'max_shift_allowance_hours', 'planned_working_days', 'working_hours',
            'no_of_varient_changeover', 'varient_changeover_time',
            'no_of_model_changeover', 'model_changeover_time', 'per_hour_OT_cost', 'std_mp',
            'ramp_up_days','working_hour_ramp_up', 'working_hours_ramp_down', 'shift', 'working_hour_opr',
            'support_dl_prod', 'support_dl_QA', 'downtime', 'downtime_MES', 'downtime_IT','no_of_sunday_working','sunday_wh'
        ]

        for field in required_fields:
            if data.get(field) is None:
                return jsonify({'error': f'Missing required field: {field}'}), 400


        if data.get('sector') not in ["Sector 63", "Sector 68","Sector 58","Sector 60"]:
            return jsonify({"error": "Only Sector 63,68,58,60 supported currently"}), 400


        if data['sector'] == "Sector 68":
             sector = data['sector'].strip()
             subsector = data.get('subsector', '').strip().upper()
             if sector == "Sector 68":
                if subsector == "FATP":
                    table_name = "sector68_fatp"
                elif subsector in ["SMT", "SMT - BLT"]:
                    table_name = "sector68_smt"
                else:
                    return jsonify({"error": f"Unknown subsector '{subsector}' for Sector 68"}), 400

        elif data['sector'] == "Sector 63":
            table_name = "sector63_all"
        elif data['sector'] == "Sector 58":
            table_name = "sector58_cfc" if data['section'] == "CFC" else "sector58_fat"
        elif data['sector'] == "Sector 60":
            if data['section'] == "BE":
                table_name = "sector60_be"
            elif data['section'] == "SMT":
                table_name = "sector60_smt"
            else:
                table_name = "sector60_cfc"        
        global last_used_table
        last_used_table = table_name
        
       
        customer = data['customer']
        model = data['model']
        section = data['section']
        plan = int(data['plan'])
        std_uph = int(data['std_uph'])
        existing_lines = float(data['existing_lines'])
        max_shift_allowance_hours = int(data['max_shift_allowance_hours'])
        working_days = int(data['planned_working_days'])
        working_hours = int(data['working_hours'])
        no_of_varient_changeover = int(data['no_of_varient_changeover'])
        varient_changeover_time = int(data['varient_changeover_time'])
        no_of_model_changeover = int(data['no_of_model_changeover'])
        model_changeover_time = int(data['model_changeover_time'])
        per_hour_OT_cost = float(data['per_hour_OT_cost'])
        std_mp = int(data['std_mp'])
        ramp_up_days = int(data['ramp_up_days'])
        working_hour_ramp_up= int(data['working_hour_ramp_up'])
        working_hours_ramp_down = int(data['working_hours_ramp_down'])
        shift = int(data['shift'])
        working_hour_opr = int(data['working_hour_opr'])
        support_dl_prod = float(data['support_dl_prod'])
        support_dl_QA = float(data['support_dl_QA'])
        downtime = int(data['downtime'])
        downtime_MES = int(data['downtime_MES'])
        downtime_IT = int(data['downtime_IT'])
        no_of_sunday_working = int(data['no_of_sunday_working'])
        sunday_wh = float(data['sunday_wh'])
        
        # Derived calculations
        support_dl = support_dl_prod + support_dl_QA
        crew = existing_lines * shift
        line_roundup = round(existing_lines, 2)
        total_dl_mp = std_mp * crew
        ttl_support_dl = crew * support_dl
        existing_capacity = existing_lines * std_uph * working_days * working_hours
        line_req = round(plan / (std_uph * working_days * working_hours), 2) if std_uph * working_days * working_hours != 0 else 0
        line_gap = round(existing_lines - line_req, 2)
        capa_short = plan - existing_capacity
        req_hours_capa_short = round(capa_short / (std_uph * working_days * existing_lines), 1) if std_uph * working_days * existing_lines != 0 else 0
        ttl_hours_req_prod = round(working_hours + req_hours_capa_short, 1)
        final_wh = round(max(ttl_hours_req_prod, working_hours), 2)
        final_wh_shift = min(max_shift_allowance_hours, final_wh)
        working_hours_OT = math.ceil(final_wh_shift) if existing_lines > 0 else 0
        capa_short_hrs = max(0, final_wh - final_wh_shift)
        line_req_ot_raw = plan / (std_uph * working_days * final_wh) if std_uph * working_days * final_wh != 0 else 0
        line_req_ot = round(line_req_ot_raw, 2)
        line_gap_ot = round(existing_lines - line_req_ot_raw, 2)
        capa_ot = existing_lines * working_days * std_uph * working_hours_OT
        capa_gap = capa_ot - plan
        ot_hours = round(final_wh - working_hours, 2)
        ot_hours_calc = (working_hours_OT - working_hours) / 2
        dl_ot_mh = crew * ot_hours_calc * std_mp * working_days
        support_dl_ot_mh = ot_hours_calc * support_dl * crew * working_days
        dl_ot_cost = per_hour_OT_cost * dl_ot_mh
        support_dl_ot_cost = ttl_support_dl * ot_hours_calc * per_hour_OT_cost * working_days

        support_dl_ot_mh_prod = support_dl_prod * crew * ot_hours_calc * working_days
        support_dl_ot_cost_prod = support_dl_ot_mh_prod * per_hour_OT_cost
        support_dl_ot_mh_QA = support_dl_QA * crew * ot_hours_calc * working_days
        support_dl_ot_cost_QA = support_dl_ot_mh_QA * per_hour_OT_cost

        sunday_prod = sunday_wh*no_of_sunday_working*std_uph*existing_lines
        sunday_ot_cost = ((std_mp + support_dl)*crew)*(sunday_wh/2)*no_of_sunday_working*per_hour_OT_cost

        varient_changeover_loss_mh = no_of_varient_changeover * varient_changeover_time * (std_mp + support_dl)
        varient_changeover_mh_cost = varient_changeover_loss_mh * per_hour_OT_cost
        model_changeover_loss_mh = no_of_model_changeover * model_changeover_time * (std_mp + support_dl)
        model_changeover_mh_cost = model_changeover_loss_mh * per_hour_OT_cost

        ramp_up_eff = 0
        uph_eff_ramp_up = ramp_up_eff * std_uph
        uph_loss_ramp_up = std_uph - uph_eff_ramp_up
        ramp_up_working_hours = working_hours_OT
        ramp_up_line = 0
        ramp_up_monthly_loss_qty = ramp_up_line * ramp_up_working_hours * ramp_up_days * uph_loss_ramp_up
        rqd_day_opr_loss_ramp_up = (
            ramp_up_monthly_loss_qty / (std_uph * ramp_up_line * ramp_up_working_hours)
            if std_uph * ramp_up_line * ramp_up_working_hours != 0 else 0
            )
        opr_loss_cost_ramp_up = ramp_up_working_hours * (std_mp + support_dl) * per_hour_OT_cost * rqd_day_opr_loss_ramp_up
        ramp_down_eff = 0
        uph_ramp_down = ramp_down_eff * std_uph
        ramp_down_days = 0
        total_ramp_down_loss = uph_ramp_down * ramp_down_days * working_hours_OT * line_roundup
        rqd_day_RD_loss = (
        total_ramp_down_loss / (working_hours_ramp_down * std_uph * existing_lines)
        if working_hours_ramp_down * std_uph * existing_lines != 0 else 0
        )
        rd_loss_cost = working_hours_ramp_down * (std_mp + support_dl) * per_hour_OT_cost * rqd_day_RD_loss * crew
        opr_eq_loss_bm = downtime + downtime_IT + downtime_MES
        opr_month_loss_qty = (opr_eq_loss_bm / 60) * working_days * std_uph * crew
        rqd_day_opr_loss = (
            opr_month_loss_qty / (working_hour_opr * std_uph * existing_lines)
            if working_hour_opr * std_uph * existing_lines != 0 else 0
            )
        opr_loss_cost = working_hours_OT * (std_mp + support_dl) * per_hour_OT_cost * rqd_day_opr_loss * line_roundup

        ttl_cost_model_wise = 0
        ttl_cost_customer_wise = 0

        normal_wh = (working_days * working_hours * crew * std_mp) + (working_days * working_hours * support_dl * crew)
        # Ensure these values are not NaN
        dl_ot_cost = 0 if pd.isna(dl_ot_cost) else dl_ot_cost
        support_dl_ot_cost = 0 if pd.isna(support_dl_ot_cost) else support_dl_ot_cost
        cur = mysql.connection.cursor()
        query = f"""
            INSERT INTO {table_name} (
                customer, model, section, plan, std_uph, existing_lines, max_shift_allowance_hours,
                working_days, working_hours, line_req, line_gap, existing_capacity, normal_wh,
                capa_short, req_hours_capa_short, ttl_hours_req_prod, final_wh, final_wh_shift, ot_hours,
                capa_short_hrs, working_hours_OT, line_req_ot, line_gap_ot, capa_ot, capa_gap,
                no_of_sunday_working, sunday_wh, sunday_prod, sunday_ot_cost, no_of_varient_changeover,
                varient_changeover_time, varient_changeover_loss_mh, varient_changeover_mh_cost,
                no_of_model_changeover, model_changeover_time, model_changeover_loss_mh,
                model_changeover_mh_cost, ramp_up_eff, uph_eff_ramp_up, uph_loss_ramp_up, ramp_up_days,
                ramp_up_working_hours, ramp_up_line, ramp_up_monthly_loss_qty, working_hour_ramp_up, rqd_day_opr_loss_ramp_up,
                opr_loss_cost_ramp_up, ramp_down_eff, uph_ramp_down, ramp_down_days,
                total_ramp_down_loss, working_hours_ramp_down, rqd_day_RD_loss, rd_loss_cost, opr_eq_loss_bm,
                opr_month_loss_qty, working_hour_opr, rqd_day_opr_loss, opr_loss_cost, line_roundup, std_mp,
                support_dl, ot_hours_calc, dl_ot_mh, support_dl_ot_mh, shift, crew, total_dl_mp, ttl_support_dl,
                dl_ot_cost, support_dl_ot_cost, ttl_cost_model_wise, ttl_cost_customer_wise,
                support_dl_prod, support_dl_ot_mh_prod, support_dl_ot_cost_prod,
                support_dl_QA, support_dl_ot_mh_QA, support_dl_ot_cost_QA
            ) VALUES ({','.join(['%s'] * 79)})
        """
        values = (
            customer, model, section, plan, std_uph, existing_lines, max_shift_allowance_hours,
            working_days, working_hours, line_req, line_gap, existing_capacity, normal_wh,
            capa_short, req_hours_capa_short, ttl_hours_req_prod, final_wh, final_wh_shift, ot_hours,
            capa_short_hrs, working_hours_OT, line_req_ot, line_gap_ot, capa_ot, capa_gap,
            no_of_sunday_working, sunday_wh, sunday_prod, sunday_ot_cost, no_of_varient_changeover,
            varient_changeover_time, varient_changeover_loss_mh, varient_changeover_mh_cost,
            no_of_model_changeover, model_changeover_time, model_changeover_loss_mh,
            model_changeover_mh_cost, ramp_up_eff, uph_eff_ramp_up, uph_loss_ramp_up, ramp_up_days,
            ramp_up_working_hours, ramp_up_line, ramp_up_monthly_loss_qty, working_hour_ramp_up, rqd_day_opr_loss_ramp_up,
            opr_loss_cost_ramp_up, ramp_down_eff, uph_ramp_down, ramp_down_days,
            total_ramp_down_loss, working_hours_ramp_down, rqd_day_RD_loss, rd_loss_cost, opr_eq_loss_bm,
            opr_month_loss_qty, working_hour_opr, rqd_day_opr_loss, opr_loss_cost, line_roundup, std_mp,
            support_dl, ot_hours_calc, dl_ot_mh, support_dl_ot_mh, shift, crew, total_dl_mp, ttl_support_dl,
            dl_ot_cost, support_dl_ot_cost, ttl_cost_model_wise, ttl_cost_customer_wise,
            support_dl_prod, support_dl_ot_mh_prod, support_dl_ot_cost_prod,
            support_dl_QA, support_dl_ot_mh_QA, support_dl_ot_cost_QA
        )
        cur.execute(query, values)
        # --- Reset ttl_cost_model_wise to 0 for older rows ---
        cur.execute(f"""
            UPDATE {table_name} t1
            INNER JOIN (
                SELECT customer, model, MAX(id) AS max_id
                FROM {table_name}
                GROUP BY customer, model
            ) t2 ON t1.customer = t2.customer AND t1.model = t2.model
            SET t1.ttl_cost_model_wise = 0
            WHERE t1.id != t2.max_id
        """)
        mysql.connection.commit()

        # # --- Set correct total only in latest row per customer+model ---
        # cur.execute(f"""
        #     UPDATE {table_name} t1
        #     INNER JOIN (
        #         SELECT customer, model, MAX(id) AS max_id,
        #             SUM(dl_ot_cost + support_dl_ot_cost) AS total_model_cost
        #         FROM {table_name}
        #         GROUP BY customer, model
        #     ) t2 ON t1.id = t2.max_id
        #     SET t1.ttl_cost_model_wise = t2.total_model_cost
        # """)
        # mysql.connection.commit()

        # First reset all values in ttl_cost_model_wise to 0
        cur.execute(f"UPDATE {table_name} SET ttl_cost_model_wise = 0")

        # Now update only the latest row for each customer-model with the correct total
        # Update only the latest row for each customer-model with the correct total
        cur.execute(f"""
            UPDATE {table_name} t1
            JOIN (
            SELECT MAX(id) AS max_id, customer, model
            FROM {table_name}
            GROUP BY customer, model
            ) latest
            ON t1.id = latest.max_id
            JOIN (
            SELECT customer, model, SUM(dl_ot_cost + support_dl_ot_cost) AS total_cost
            FROM {table_name}
            GROUP BY customer, model
            ) totals ON latest.customer = totals.customer AND latest.model = totals.model
            SET t1.ttl_cost_model_wise = totals.total_cost
            WHERE t1.ttl_cost_model_wise != totals.total_cost
        """)

        mysql.connection.commit()

        # --- Reset ttl_cost_customer_wise to 0 for older rows ---
        cur.execute(f"""
            UPDATE {table_name} t1
            INNER JOIN (
                SELECT customer, MAX(id) AS max_id
                FROM {table_name}
                GROUP BY customer
            ) t2 ON t1.customer = t2.customer
            SET t1.ttl_cost_customer_wise = 0
            WHERE t1.id != t2.max_id
        """)
        mysql.connection.commit()

        # --- Set correct total only in latest row per customer ---
        cur.execute(f"""
            UPDATE {table_name} t1
            INNER JOIN (
                SELECT customer, MAX(id) AS max_id,
                    SUM(ttl_cost_model_wise) AS total_cost
                FROM {table_name}
                GROUP BY customer
            ) t2 ON t1.id = t2.max_id
            SET t1.ttl_cost_customer_wise = t2.total_cost
        """)
        mysql.connection.commit()

        cur.close()

        return jsonify({'message': 'Data submitted and calculated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def format_export_dataframe(df):
    comma_fields = [
        'plan', 'existing_capacity', 'capa_short', 'capa_ot', 'capa_gap',
        'sunday_prod', 'sunday_ot_cost', 'varient_changeover_loss_mh',
        'varient_changeover_mh_cost', 'model_changeover_loss_mh',
        'model_changeover_mh_cost', 'ramp_up_monthly_loss_qty', 'opr_loss_cost_ramp_up',
        'total_ramp_down_loss', 'rd_loss_cost', 'opr_loss_cost', 'opr_month_loss_qty',
        'total_dl_mp', 'ttl_cost_model_wise', 'ttl_cost_customer_wise',
        'support_dl_ot_cost_prod', 'support_dl_ot_cost_QA','no_of_sunday_working','sunday_wh'
    ]

    float_fields = df.select_dtypes(include='float').columns.tolist()
    df[float_fields] = df[float_fields].round(2)

    for col in comma_fields:
        if col in df.columns:
            df[col] = df[col].apply(lambda x: f"{int(x):,}" if pd.notna(x) else "-")

    df = df.fillna("-")
    return df

@app.route('/download-excel-by-selection', methods=['GET'])
def download_excel_by_selection():
    from flask import request, send_file
    import pandas as pd
    from io import BytesIO

    sector = request.args.get('sector')
    subsector = request.args.get('subsector')

    table_map = {
        "Sector 68": {
            "FATP": "sector68_fatp",
            "SMT": "sector68_smt",
            "SMT - BLT": "sector68_smt"
        },
        "Sector 63": {
            "All Sections": "sector63_all"
        },
        "Sector 58": {
            "FAT": "sector58_fat",
            "CFC": "sector58_cfc"
        },
        "Sector 60": {
            "BE": "sector60_be",
            "SMT": "sector60_smt",
            "CFC": "sector60_cfc"
        }
    }

    try:
        table_name = table_map[sector][subsector]
    except KeyError:
        return jsonify({"error": "Invalid sector or subsector"}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute(f"SELECT * FROM {table_name}")
        rows = cur.fetchall()
        columns = [col[0] for col in cur.description]
        cur.close()

        df = pd.DataFrame(rows, columns=columns)
        if df.empty:
            return jsonify({"error": "No data found."}), 404

        output = BytesIO()
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, sheet_name='Data', index=False)
            writer.book.add_worksheet('Chart')  # Optional blank chart sheet

        output.seek(0)
        return send_file(
            output,
            download_name=f"{table_name}_data.xlsx",
            as_attachment=True,
            mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to generate Excel"}), 500
    
@app.route('/download-sector-subsector', methods=['POST'])
def download_sector_subsector_excel():
    try:
        sector = request.form.get('sector')
        subsector = request.form.get('subsector')

        if not sector or not subsector:
            return jsonify({"error": "Missing sector or subsector"}), 400

        # Determine the correct table name
        if sector == "Sector 68":
            if subsector.upper() == "FATP":
                table_name = "sector68_fatp"
            elif subsector.upper() in ["SMT", "SMT - BLT"]:
                table_name = "sector68_smt"
            else:
                return jsonify({"error": "Invalid subsector for Sector 68"}), 400
        elif sector == "Sector 63":
            table_name = "sector63_all"
        elif sector == "Sector 58":
            table_name = "sector58_cfc" if subsector.upper() == "CFC" else "sector58_fat"
        elif sector == "Sector 60":
            if subsector.upper() == "BE":
                table_name = "sector60_be"
            elif subsector.upper() == "SMT":
                table_name = "sector60_smt"
            else:
                table_name = "sector60_cfc"
        else:
            return jsonify({"error": "Unsupported sector"}), 400

        cur = mysql.connection.cursor()
        cur.execute(f"SELECT * FROM {table_name}")
        rows = cur.fetchall()
        if not rows:
            return jsonify({"error": "No data found in the table."}), 404
        columns = [desc[0] for desc in cur.description]
        cur.close()


        df = pd.DataFrame(rows, columns=columns)
        df.sort_values(by=["customer", "model", "section"], inplace=True)

        output = BytesIO()
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, index=False, sheet_name='Data')
            for i, col in enumerate(df.columns):
                width = max(len(str(col)), df[col].astype(str).map(len).max()) + 2
                writer.sheets['Data'].set_column(i, i, width)

        output.seek(0)
        return send_file(
            output,
            as_attachment=True,
            download_name=f"{table_name}_sector_export.xlsx",
            mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
    except Exception as e:
        print(f"Download error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    cur = mysql.connection.cursor()
    cur.execute("SELECT id, password, role FROM users WHERE username=%s", (username,))
    user = cur.fetchone()
    cur.close()

    if user and password == user[1]:  # Hash check recommended
        return jsonify({"status": "success", "role": user[2]})
    else:
        return jsonify({"status": "fail", "message": "Invalid credentials"}), 401

@app.route('/admin/add-sector', methods=['POST'])
def add_sector():
    data = request.get_json()
    name = data.get('name')
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO sectors (name) VALUES (%s)", (name,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Sector added"}), 201
@app.route('/admin/add-subsector', methods=['POST'])
def add_subsector():
    data = request.get_json()
    name = data.get('name')
    sector_name = data.get('sector')

    cur = mysql.connection.cursor()

    # Fetch sector_id from sector name
    cur.execute("SELECT id FROM sectors WHERE name = %s", (sector_name,))
    result = cur.fetchone()
    if not result:
        cur.close()
        return jsonify({"error": f"Sector '{sector_name}' not found"}), 404

    sector_id = result[0]

    # Insert new subsector
    cur.execute("INSERT INTO subsectors (name, sector_id) VALUES (%s, %s)", (name, sector_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": f"Subsector '{name}' added under sector '{sector_name}'"}), 201
@app.route('/admin/add-customer', methods=['POST'])
def add_customer():
    data = request.get_json()
    name = data.get('name')

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO customers (name) VALUES (%s)", (name,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": f"Customer '{name}' added successfully."}), 201
@app.route('/admin/add-model', methods=['POST'])
def add_model():
    data = request.get_json()
    name = data.get('name')
    customer_name = data.get('customer')

    cur = mysql.connection.cursor()

    # Get customer ID
    cur.execute("SELECT id FROM customers WHERE name = %s", (customer_name,))
    result = cur.fetchone()
    if not result:
        cur.close()
        return jsonify({"error": f"Customer '{customer_name}' not found"}), 404

    customer_id = result[0]

    # Insert new model
    cur.execute("INSERT INTO models (name, customer_id) VALUES (%s, %s)", (name, customer_id))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": f"Model '{name}' added for customer '{customer_name}'."}), 201
@app.route('/admin/add-section', methods=['POST'])
def add_section():
    data = request.get_json()
    name = data.get('name')

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO sections (name) VALUES (%s)", (name,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": f"Section '{name}' added successfully."}), 201

@app.route('/get-categories', methods=['GET'])
def get_categories():
    cur = mysql.connection.cursor()

    # Fetch sector and subsector mapping
    cur.execute("SELECT s.name, ss.name FROM sectors s JOIN subsectors ss ON s.id = ss.sector_id")
    sector_data = cur.fetchall()
    sector_map = {}
    for sector, subsector in sector_data:
        sector_map.setdefault(sector, []).append(subsector)

    # Fetch customers and their models
    cur.execute("SELECT id, name FROM customers")
    customers = cur.fetchall()
    customer_map = {}
    for cid, name in customers:
        cur.execute("SELECT name FROM models WHERE customer_id = %s", (cid,))
        models = [row[0] for row in cur.fetchall()]
        customer_map[name] = models

    # Fetch sections
    cur.execute("SELECT name FROM sections")
    sections = [row[0] for row in cur.fetchall()]

    cur.close()
    return jsonify({
        "sectors": sector_map,
        "customers": customer_map,
        "sections": sections
    })

if __name__ == '__main__':
    app.run(debug=True)
