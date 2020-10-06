from Instrumento import Instrumento

class Violin(Instrumento):
  def afinar(self):
    print("Afinando violin")
  
  def tocar(self):
    print("Tocando violin")

  def tocaren(self, nota):
    print("Tocando violin con",nota)