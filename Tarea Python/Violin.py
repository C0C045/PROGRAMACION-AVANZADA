from Instrumento import Instrumento

class Violin(Instrumento):
  def afinar(self):
    print("Afinando violin")
  
  def tocar(self, nota = None):
    if (nota != None):
    	print("Tocando violin con",nota)
    else:
    	print("Tocando violin")