from Banda import Banda

class Principal():
  
  def main():
  	b = Banda()
  	b.agregarMusico("Juan")
  	b.agregarMusico("Maria")
  	b.agregarMusico("Miguel")

  	b.presentarBanda()

  if __name__ == "__main__":
    main()