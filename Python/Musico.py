from abc import ABCMeta, abstractmethod

class Musico(Persona, metaclass=ABCMeta):
  def toca(Intrumento i): 
    i.afinar()
    i.tocar()
    i.tocaren()
