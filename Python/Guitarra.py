from Instrumento import Instrumento

class Guitarra(Instrumento):
  def afinar(self):
    print("Afinando guitarra")
  
  def tocar(self):
    print("Tocando guitarra")

  def tocaren(self,nota):
    print("Tocando guitarra con",nota)