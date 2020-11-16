#Pico y Fijas
import random

#Declaración de variables
w = 1
contador = 0
lista = []
lista1 = []
list_three = []
list_four = []
list_five = []
cont_fijas = 0
cont_pica = 0
numeros_three = []
numeros_four = []
numeros_five = []

#Método para validar nombre en mi documento con respecto a n dígitos
def validar_nombre(nombre,n):
  s = establecer_archivo("r")
  for linea in s.readlines():
    elementos = [str(x) for x in linea.split(",")]
    if(elementos[0] == nombre and int(elementos[1]) == n):
      print("Usted ya esta registrado para",n,"cifras")
      exit()

#Manejo del archivo y su modificador
def establecer_archivo(permiso):
  arch = open("archivo.txt", permiso)
  return arch

#Metodo para imprimir el lider
def imprimir_lider(lider):
  s = establecer_archivo("a")
  s.write(lider+"\n")

#Hacer la respectiva comprobación para comprobar el líder
def comprobar_lider():
  s = establecer_archivo("r")
  lideres_three = []
  lideres_four = []
  lideres_five = []
  for linea in s.readlines():
    elementos = [str(x) for x in linea.split(",")]
    if len(elementos)==6:
      #Líderes para 3 cifras
      if int(elementos[-1]) == 3 and int(elementos[1]) == 3:
        list_three.append(elementos[0]+","+elementos[2])
        numeros_three.append(elementos[2])
        minimo = min(numeros_three)
        lideres_three = []
        for linea in list_three:
          elementos1 = [str(x) for x in linea.split(",")]
          if (elementos1[-1] == minimo):
            lideres_three.append(elementos1[0])
            lideres_three.append("-")
      #Líderes para 4 cifras
      elif int(elementos[-1]) == 4 and int(elementos[1]) == 4:
        list_four.append(elementos[0]+","+elementos[2])
        numeros_four.append(elementos[2])
        minimo = min(numeros_four)
        lideres_four = []
        for linea in list_four:
          elementos2 = [str(x) for x in linea.split(",")]
          if (elementos2[-1] == minimo):
            lideres_four.append(elementos2[0])
            lideres_four.append("-")
      #Lideres para 5 cifras
      elif int(elementos[-1]) == 5 and int(elementos[1]) == 5:
        list_five.append(elementos[0]+","+elementos[2])
        numeros_five.append(elementos[2])
        minimo = min(numeros_five)
        lideres_five = []
        for linea in list_five:
          elementos3 = [str(x) for x in linea.split(",")]
          if (elementos3[-1] == minimo):
            lideres_five.append(elementos3[0])
            lideres_five.append("-")
  print("LIDERES DE 3 CIFRAS:",*lideres_three)
  print("LIDERES DE 4 CIFRAS:",*lideres_four)
  print("LIDERES DE 5 CIFRAS:",*lideres_five)
  """imprimir_lider("LIDERES DE 3 CIFRAS:"+str(lideres_three))
  imprimir_lider("LIDERES DE 4 CIFRAS:"+str(lideres_four))
  imprimir_lider("LIDERES DE 5 CIFRAS:"+str(lideres_five)+"\n")"""
  
#Pedir el nombre del usuario
nombre = input("Ingrese su nombre:")

#Menu
print("===OPCIONES DE JUEGO===")
print("1) 3 Digitos - 10 intentos para ganar")
print("2) 4 Digitos - 15 intentos para ganar")
print("3) 5 Digitos - 20 intentos para ganar")
print("4) Salir")
menu = int(input("Elija una opción de juego:"))

n = menu+2

#Validar el número que no se repita
def validar_numero(numero):
  if len(numero) == 1:
    v =  True
  else:
    if numero[0] in numero[1:]:
      v = False
    else: 
      v = validar_numero(numero[1:])
  return v

#Generar el numero aleatorio
while w<=n:
  num = random.randint(0,9)
  if num not in lista:
    lista.append(num)
    w+=1

#Asignar el numero de intentos dependiendo de la opcion marcada
if(menu==1):
  inten=10
  validar_nombre(nombre,n)
elif menu == 2:
  inten=15
  validar_nombre(nombre,n)
elif menu == 3:
  inten=20
  validar_nombre(nombre,n)

#Ir digitando los valores e ir guardadndo en el documento
for i in range(0,inten):
  f = establecer_archivo("a")
  if(contador<n):
    f.write(nombre+",")
    f.write(str(n)+",")
    print("\nIntento número "+str(i+1))
    f.write(str(i+1)+",")
    inte = input("Ingrese su número:")
    if(len(inte) == n and validar_numero(inte) == True):
      f.write(str(inte)+",")
    while(len(str(inte))!=n or validar_numero(inte) == False):
      print("¡Su número debe ser de "+str(n)+" cifras y sin repetir!")
      inte = input("Ingrese nuevamente su número:")
      if(len(inte) == n and validar_numero(inte) == True):
        f.write(str(inte)+",")
    contador = 0
    cont_fijas = 0
    cont_pica = 0
    lista1 = []
    #Hacer la comprobación para saber las picas y fijas
    for i in range(0,n):
      for j in range(0,n):
        lista1.append(str(inte)[j])
        if(int(lista[i]) == int(lista1[j]) and int(i)== int(j)):
          print("Fija")
          contador+=1
          cont_fijas+=1
        elif(int(lista[i]) == int(lista1[j])):
          print("Pica")
          cont_pica+=1
    f.write(str(cont_pica)+","+str(cont_fijas)+"\n")

#Validar si el usuario ganó o perdió
if (contador == n):
  print("¡USTED HA ADIVINADO EL NÚMERO CORRECTAMENTE!")
  print("EL NÚMERO ES: ",*lista,"\n")
  f.write("")
else:
  print("¡USTED PERDIO!")
  print("EL NÚMERO ERA: ",*lista)

com = comprobar_lider()
f.close()