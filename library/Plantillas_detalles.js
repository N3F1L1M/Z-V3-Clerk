
export const plantillas = [
 
  {
    label: "Excavadora",
    color:       { placeholder: "Seleccione su color", select: ["Naranja", "Negro", "Amarillo"] },
    profundidad: { placeholder: "Escriba su profundidad en metros", input: "20 metros" },
    peso:        { placeholder: "Escriba su peso en toneladas", input: "15 toneladas" }
  },
  {
    label: "Montacargas",
    tipo:        { placeholder: "Seleccione el tipo", select: ["Eléctrico", "Diésel", "Gas LP"] },
    capacidad:   { placeholder: "Capacidad máxima de carga", input: "3 toneladas" },
    altura:      { placeholder: "Altura máxima de elevación", input: "4.5 metros" },
    marca:       { placeholder: "Seleccione la marca", select: ["Toyota", "Caterpillar", "Hyster", "Yale"] }
  },
  {
    label: "Camión cisterna",
    combustible: { placeholder: "Seleccione el tipo de combustible", select: ["Diésel", "Gasolina"] },
    capacidad:   { placeholder: "Capacidad del tanque", input: "10000 litros" },
    ejes:        { placeholder: "Número de ejes", input: "3" },
    marca:       { placeholder: "Seleccione la marca", select: ["Volvo", "Scania", "Freightliner"] }
  },
  {
    label: "Generador eléctrico",
    potencia:    { placeholder: "Potencia nominal", input: "150 kVA" },
    combustible: { placeholder: "Seleccione el combustible", select: ["Diésel", "Gasolina", "Gas natural"] },
    voltaje:     { placeholder: "Voltaje de salida", input: "480 V" },
    frecuencia:  { placeholder: "Frecuencia de operación", select: ["50 Hz", "60 Hz"] }
  },
  {
    label: "Compresor de aire",
    tipo:        { placeholder: "Seleccione el tipo", select: ["Pistón", "Tornillo", "Centrífugo"] },
    potencia:    { placeholder: "Potencia nominal", input: "30 HP" },
    presión:     { placeholder: "Presión máxima de trabajo", input: "8 bar" },
    caudal:      { placeholder: "Caudal nominal", input: "3.5 m³/min" }
  },
  {
    label: "Cinta transportadora",
    ancho:       { placeholder: "Ancho de banda", input: "800 mm" },
    longitud:    { placeholder: "Longitud total", input: "10 metros" },
    velocidad:   { placeholder: "Velocidad de operación", input: "1.5 m/s" },
    material:    { placeholder: "Seleccione el material de la banda", select: ["PVC", "Caucho", "Acero inoxidable"] }
  },
  {
    label: "Planta mezcladora de concreto",
    capacidad:   { placeholder: "Capacidad de mezcla", input: "1.5 m³" },
    tipo:        { placeholder: "Seleccione el tipo", select: ["Estacionaria", "Móvil"] },
    potencia:    { placeholder: "Potencia del motor principal", input: "90 kW" },
    fabricante:  { placeholder: "Seleccione el fabricante", select: ["CIFA", "ELKON", "Ammann"] }
  },
  {
    label: "Grúa hidráulica",
    alcance:     { placeholder: "Alcance máximo", input: "25 metros" },
    capacidad:   { placeholder: "Capacidad de carga", input: "10 toneladas" },
    tipo:        { placeholder: "Seleccione el tipo", select: ["Telescópica", "Articulada"] },
    marca:       { placeholder: "Seleccione la marca", select: ["Liebherr", "Palfinger", "Fassi"] }
  },
  {
    label: "Bomba de agua industrial",
    caudal:      { placeholder: "Caudal nominal", input: "500 L/min" },
    presión:     { placeholder: "Presión máxima", input: "6 bar" },
    tipo:        { placeholder: "Seleccione el tipo de bomba", select: ["Centrífuga", "Peristáltica", "Sumergible"] },
    motor:       { placeholder: "Potencia del motor", input: "5 HP" }
  }
];

