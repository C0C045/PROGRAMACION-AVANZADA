
from flask import Flask, request, flash, url_for, redirect, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.sqlite3'
app.config['SECRET_KEY'] = "random string"

db = SQLAlchemy(app)

"""DATOS BÁSICOS"""
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

"""FORMACION"""
class students1(db.Model):
    id = db.Column('student_id', db.Integer, primary_key = True)
    primary = db.Column(db.String(100))
    secundary = db.Column(db.String(100))
    tecn1 = db.Column(db.String(100))
    tecn2 = db.Column(db.String(100))
    collegue = db.Column(db.String(100))
    other = db.Column(db.String(100))

    def __init__(self, primary, secundary, tecn1, tecn2, collegue, other):
         self.primary = primary
         self.secundary = secundary
         self.tecn1 = tecn1
         self.tecn2 = tecn2
         self.collegue = collegue
         self.other = other

"""INTERESES"""
class students2(db.Model):
    id = db.Column('student_id', db.Integer, primary_key = True)
    in1 = db.Column(db.String(100))
    in2 = db.Column(db.String(100))
    in3 = db.Column(db.String(100))
    in4 = db.Column(db.String(100))
    in5 = db.Column(db.String(100))

    def __init__(self, in1, in2, in3, in4, in5):
         self.in1 = in1
         self.in2 = in2
         self.in3 = in3
         self.in4 = in4
         self.in5 = in5

@app.route('/')
def show_all():
   return render_template('show_all.html', students = students.query.all() )

@app.route('/curriculum')
def curriculum():
    id = request.form.get("student_id")
    return render_template('curriculum.html', student = students.query.filter_by(id=1).first())

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

@app.route('/academic', methods = ['GET', 'POST'])
def academic():
   if request.method == 'POST':
      if not request.form['primary'] or not request.form['secundary']:
         flash('Please enter all the fields', 'error')
      else:
         student = students1(request.form['primary'], request.form['secundary'],request.form['tecn1'],
          request.form['tecn2'], request.form['collegue'], request.form['other'])

         db.session.add(student)
         db.session.commit()
         flash('Record was successfully added')
         return redirect(url_for('show_all'))
   return render_template('academic.html')

@app.route('/hobbies', methods = ['GET', 'POST'])
def hobbies():
   if request.method == 'POST':
      if not request.form['in1'] or not request.form['in2']:
         flash('Please enter all the fields', 'error')
      else:
         student = students2(request.form['in1'], request.form['in2'],request.form['in3'],
          request.form['in4'], request.form['in5'])

         db.session.add(student)
         db.session.commit()
         flash('Record was successfully added')
         return redirect(url_for('show_all'))
   return render_template('hobbies.html')

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
