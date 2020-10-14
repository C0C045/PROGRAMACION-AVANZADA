from Instrumento import Instrumento

class Guitarra(Instrumento):
  def afinar(self):
    print("Afinando guitarra")  

  def tocar(self,nota = None):
  	if (nota != None):
  		print("Tocando guitarra con",nota)
  	else:
  		print("Tocando guitarra")
  		
    