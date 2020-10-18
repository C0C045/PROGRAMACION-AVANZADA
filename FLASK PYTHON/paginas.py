from flask import Flask, redirect, url_for, request,render_template
app = Flask(__name__)

"""Para Steven"""
@app.route('/id')
def id():
   return render_template('Base/PERFIL.html')
@app.route('/fact')
def fact():
   return render_template('Base/DATOS.html')
@app.route('/formation')
def formation():
   return render_template('Base/FORMACIÓN.html')
@app.route('/likes')
def likes():
   return render_template('Base/INTERESES.html')



@app.route('/datos')
def datos():
   return render_template('Hoja de vida/Hoja de vida.html')
@app.route('/formacion')
def formacion():
   return render_template('Hoja de vida/Formación Academica.html')
@app.route('/tecnologia')
def tecnologia():
   return render_template('Hoja de vida/Tecnología de Interes.html')


@app.route('/')
def main():
   return render_template('index.html')


if __name__ == '__main__':
   app.run()