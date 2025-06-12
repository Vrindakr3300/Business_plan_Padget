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

        ttl_cost_model_wise = dl_ot_cost + support_dl_ot_cost 

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

@app.route('/download-excel', methods=['GET'])
def download_excel():
    try:
        global last_used_table
        print(f"Last used table: {last_used_table}")  

        allowed_tables = {
            "sector68_fatp", "sector68_smt", "sector63_all",
            "sector58_cfc", "sector58_fat", "sector60_be",
            "sector60_fatp", "sector60_smt"
        }

        if last_used_table is None or last_used_table not in allowed_tables:
            return jsonify({"error": "No Sector data submitted yet."}), 400


        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='@vrindakr051204',
            database='business_plan'
        )
        print("Database connection established.")  
        cursor = conn.cursor()
        query = f"SELECT * FROM {last_used_table}"
        print(f"Executing query: {query}")  
        cursor.execute(query)
        rows = cursor.fetchall()
        print(f"Rows fetched: {rows}")  

        if not rows:
            return jsonify({"error": "No data found in the table."}), 404

        columns = [desc[0] for desc in cursor.description]
        cursor.close()
        conn.close()

        df = pd.DataFrame(rows, columns=columns)
        print(f"DataFrame created with shape: {df.shape}")  

       
        if df.empty:
            return jsonify({"error": "DataFrame is empty, no data to download."}), 404

        df[['dl_ot_cost', 'support_dl_ot_cost']] = df.groupby(['customer', 'model'])[['dl_ot_cost', 'support_dl_ot_cost']].transform('sum')

        df.sort_values(by=["customer", "model","section"], inplace=True)

        output = BytesIO()
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, index=False, sheet_name='Data', startrow=1, header=False)
            workbook = writer.book
            worksheet = writer.sheets['Data']

            
            header_format = workbook.add_format({'bold': True, 'bg_color': '#D9E1F2'})
            for col_num, value in enumerate(df.columns.values):
                worksheet.write(0, col_num, value, header_format)

            
            current_customer = None
            start_row = 1
            for row in range(1, len(df) + 1):
                customer = df.iloc[row - 1]['customer']
                if customer != current_customer:
                    if current_customer is not None:
                        worksheet.merge_range(start_row, 0, row - 1, 0, current_customer)
                    current_customer = customer
                    start_row = row
            if current_customer is not None:
                worksheet.merge_range(start_row, 0, len(df), 0, current_customer)

            for i, col in enumerate(df.columns):
                max_len = max(df[col].astype(str).map(len).max(), len(col)) + 2
                worksheet.set_column(i, i, max_len)

        output.seek(0)
        return send_file(
            output,
            as_attachment=True,
            download_name=f"{last_used_table}_export.xlsx",
            mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

    except Exception as e:
        print(f"Error: {str(e)}")  
        return jsonify({"error": str(e)}), 500

@app.route('/download', methods=['GET'])
def download_excel_raw():
    global last_used_table
    if not last_used_table:
        return jsonify({'error': 'No data to export'}), 400

    import mysql.connector
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='@vrindakr051204',
        database='business_plan'
    )

    query = f"SELECT * FROM {last_used_table}"
    df = pd.read_sql(query, conn)
    conn.close()
    df = df.sort_values(by=['customer', 'model',"section"])

    output = BytesIO()
    df.to_excel(output, index=False)
    output.seek(0)

    return send_file(output, download_name=f'{last_used_table}_export.xlsx', as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)