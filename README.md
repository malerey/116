# 116

En el codigo tenemos en App, lo mismo que hicimos en clase. 

En /components/Componentizado.js, tenemos el mismo codigo, pero esta vez componentizado. 

Tenemos dos formularios muy parecidos: el de edicion y el de creacion. Ambos hacen lo mismo.
- Obtienen la info de los usuarios en el primer render. 
- Cuando el usuario hace cambios, obtienen la info 
- Cuando el usuario guarda, setean el estado "loading"
- Cuando el estado "loading" es true, hacen un post o un put respectivamente
- Finalizado el post o put, obtienen la nueva info de los usuarios.

En preparacion para la clase que viene, anda pensando como reutilizarias esta logica. 
- Como hariamos un hook que se encargue de todo esto?
- Podriamos componentizar aun mas? Por ejemplo, cada input?
- Que hace que Componentizado sea mas claro? Por que encontramos mas rapido las cosas? Como podes aplicar esto a tu codigo en React?
