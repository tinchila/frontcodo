import sqlite3

conn = sqlite3.connect('contacts.db')
c = conn.cursor()

with open('create_table.sql', 'r') as f:
    sql = f.read()

c.executescript(sql)

# Rest of the code for inserting data, etc.
