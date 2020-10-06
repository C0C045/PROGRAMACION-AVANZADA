from abc import ABCMeta, abstractmethod

class Instrumento(metaclass=ABCMeta):
  def afinar(self):
    pass

  def tocar(self):
    pass
    
  def tocaren(nota):
    pass