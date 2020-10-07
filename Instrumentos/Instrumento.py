from abc import ABCMeta, abstractmethod

class Instrumento(metaclass=ABCMeta):
  def afinar(self):
    pass

  def tocar(self, nota=None):
    pass
    
