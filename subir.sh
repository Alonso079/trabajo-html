#!/bin/bash

# Asegurarse de que estás en el directorio correcto
cd /Documentos/trabajo

# Añadir todos los archivos al área de preparación
git add .

# Confirmar los cambios con un mensaje
read -p "Ingrese el mensaje del commit: " commit_message
git commit -m "$commit_message"

# Subir los cambios al repositorio remoto (en este caso, origin y la rama principal)
git push origin main

