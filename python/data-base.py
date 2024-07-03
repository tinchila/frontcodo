import sqlite3

def insert_contact(name, email, type, preference, brand, message, newsletter):
  # Connect to the database
  conn = sqlite3.connect('contacts.db')
  c = conn.cursor()

  # Insert data into the contacts table
  c.execute("""INSERT INTO contacts (name, email, type, preference, brand, message, newsletter)
               VALUES (?, ?, ?, ?, ?, ?, ?)""", (name, email, type, preference, brand, message, newsletter))

  # Save changes and close connection
  conn.commit()
  conn.close()

# Example usage (replace with actual form data)
name = "John Doe"
email = "johndoe@example.com"
type = "consulta"
preference = "Whisky"
brand = "Jack Daniel's"
message = "Do you have any special offers on Whisky?"
newsletter = True

insert_contact(name, email, type, preference, brand, message, newsletter)

print("Contact information saved successfully!")
