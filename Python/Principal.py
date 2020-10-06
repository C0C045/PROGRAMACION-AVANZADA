#import random
#from Instrumento import Instrumento
#from Bajo import Bajo
#from Guitarra import Guitarra
#from Violin import Violin


class Principal():
  b = Banda()
  def main():
    b.agregarMusico("Juan");
    b.agregarMusico("Maria");
    b.agregarMusico("Miguel");

    b.presentarBanda()
