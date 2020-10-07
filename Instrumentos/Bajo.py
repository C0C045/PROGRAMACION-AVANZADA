from Instrumento import Instrumento

class Bajo(Instrumento):
  def afinar(self):
    print("Afinando bajo")

  def tocar(self,nota = None):
    if (nota != None):
    	print("Tocando bajo con",nota)
    else:
    	print("Tocando bajo")