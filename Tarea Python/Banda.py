import random
from Musico import Musico
from Instrumento import Instrumento
from Violin import Violin
from Bajo import Bajo
from Guitarra import Guitarra

musicos = []

class Banda():
  def agregarMusico(self, nombre):
    m = Musico(nombre)
    musicos.append(m)

  def generarInstrumento(self):
    opc = random.randrange(3)
    if (opc == 1):
      return Guitarra()
    elif(opc == 2):
      return Bajo()
    else:
      return Violin()   
  
  def presentarBanda(self):
    for musico in musicos:
      musico.presentar()
      musico.tocar(self.generarInstrumento())
      

