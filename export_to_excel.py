import pandas as pd
import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='@vrindakr051204',
    database='business_plan'
)

query = "SELECT * FROM sector68_fatp"
df = pd.read_sql(query, conn)

df.to_excel('sector68_fatp_export.xlsx', index=False)

conn.close()
print(" Data exported to sector68_fatp_export.xlsx")
