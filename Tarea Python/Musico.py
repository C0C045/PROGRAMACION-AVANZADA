from abc import ABCMeta, abstractmethod
from Instrumento import Instrumento
from Persona import Persona


class Musico(Persona, metaclass=ABCMeta):
	def tocar(self,i): 
		i.afinar()
		i.tocar()
		i.tocar("DO")
