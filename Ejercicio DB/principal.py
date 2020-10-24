  
from flask import Flask, request, flash, url_for, redirect, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'
app.config['SECRET_KEY'] = "random string"

db = SQLAlchemy(app)

class students(db.Model):
   id = db.Column('student_id', db.Integer, primary_key = True)
   name = db.Column(db.String(100))
   lastName = db.Column(db.String(100))
   code = db.Column(db.String(10))
   years = db.Column(db.String(2))
   city = db.Column(db.String(10))
   address = db.Column(db.String(200))
   cel = db.Column(db.String(10))
   rh = db.Column(db.String(3))
   

   def __init__(self, name, lastName, code, years, city, address, cel, rh):
       self.name = name
       self.lastName = lastName
       self.code = code
       self.years = years
       self.city = city
       self.address = address
       self.cel = cel
       self.rh = rh


@app.route('/')
def show_all():
   return render_template('show_all.html', students = students.query.all() )

@app.route('/new', methods = ['GET', 'POST'])
def new():
   if request.method == 'POST':
      if not request.form['name'] or not request.form['city'] or not request.form['address'] or not request.form['code']:
         flash('Please enter all the fields', 'error')
      else:
         student = students(request.form['name'], request.form['lastName'],request.form['code'], 
          request.form['years'], request.form['city'], request.form['address'], request.form['cel'], request.form['rh'])

         db.session.add(student)
         db.session.commit()
         flash('Record was successfully added')
         return redirect(url_for('show_all'))
   return render_template('new.html')

@app.route("/update", methods=["POST"])
def update():
    name = request.form.get("oldname")
    student = students.query.filter_by(name=name).first()
    return render_template('update.html', result = student, oldname = name)

@app.route("/update_record", methods=["POST"])
def update_record():
    name = request.form.get("oldname")
    student = students.query.filter_by(name=name).first()

    student.name = request.form['name']
    student.lastName = request.form['lastName']
    student.code = request.form['code']
    student.years = request.form['years']
    student.city = request.form['city']
    student.address = request.form['address']
    student.cel = request.form['cel']
    student.rh = request.form['rh']
    db.session.commit()
    return redirect('/')

@app.route("/delete", methods=["POST"])
def delete():
    name = request.form.get("oldname")
    student = students.query.filter_by(name=name).first()
    db.session.delete(student)
    db.session.commit()
    return redirect("/")

if __name__ == '__main__':
   db.create_all()
   app.run(debug = True)