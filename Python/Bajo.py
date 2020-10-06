from Instrumento import Instrumento

class Bajo(Instrumento):
  def afinar(self):
    print("Afinando bajo")
  
  def tocar(self):
    print("Tocando bajo")

  def tocaren(self,nota):
    print("Tocando bajo con",nota)