"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResumenPedido } from "@/Types/uniforms";

// Tipos para validaciones
interface ValidationErrors {
  [key: string]: string | undefined;
}

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

const EnvioFormulario = () => {
  const [comentario, setComentario] = useState("");
  const [step, setStep] = useState(1);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("opcion1");
  const [resumen, setResumen] = useState<ResumenPedido | null>(null);
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const searchParams = useSearchParams();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [curp, setCurp] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [cp, setCp] = useState("");
  const [colonia, setColonia] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [informacionAdicional, setInformacionAdicional] = useState("");
  const [numeroInterior, setNumeroInterior] = useState("");
  const [referencia, setReferencia] = useState("");

  // Estados para validaciones
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Reglas de validación
  const validationRules: ValidationRules = {
    nombre: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
    },
    curp: {
      required: true,
      pattern: /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/,
    },
    correo: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    telefono: {
      required: true,
      pattern: /^[0-9]{10}$/,
    },
    calle: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    numero: {
      required: true,
      pattern: /^[0-9]+[A-Za-z]?$/,
    },
    cp: {
      required: true,
      pattern: /^[0-9]{5}$/,
    },
    colonia: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    municipio: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    ciudad: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    estado: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    terminosAceptados: {
      custom: (value) => {
        if (!terminosAceptados) {
          return "Debes aceptar los términos y condiciones";
        }
        return null;
      },
    },
  };

  // Función para validar un campo específico
  const validateField = (name: string, value: string): string | null => {
    const rule = validationRules[name];
    if (!rule) return null;

    // Campo requerido
    if (rule.required && (!value || value.trim() === "")) {
      return `${getFieldLabel(name)} es requerido`;
    }

    // Si no es requerido y está vacío, no validar más
    if (!rule.required && (!value || value.trim() === "")) {
      return null;
    }

    // Longitud mínima
    if (rule.minLength && value.length < rule.minLength) {
      return `${getFieldLabel(name)} debe tener al menos ${
        rule.minLength
      } caracteres`;
    }

    // Longitud máxima
    if (rule.maxLength && value.length > rule.maxLength) {
      return `${getFieldLabel(name)} no puede exceder ${
        rule.maxLength
      } caracteres`;
    }

    // Patrón regex
    if (rule.pattern && !rule.pattern.test(value)) {
      return getPatternErrorMessage(name);
    }

    // Validación personalizada
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  };

  // Obtener etiqueta del campo
  const getFieldLabel = (fieldName: string): string => {
    const labels: { [key: string]: string } = {
      nombre: "Nombre",
      curp: "RFC/CURP",
      correo: "Email",
      telefono: "Teléfono",
      calle: "Calle",
      numero: "Número",
      cp: "Código Postal",
      colonia: "Colonia",
      municipio: "Municipio",
      ciudad: "Ciudad",
      estado: "Estado",
      terminosAceptados: "Términos y condiciones",
    };
    return labels[fieldName] || fieldName;
  };

  // Mensajes de error para patrones
  const getPatternErrorMessage = (fieldName: string): string => {
    const messages: { [key: string]: string } = {
      nombre: "El nombre solo puede contener letras y espacios",
      curp: "CURP inválida. Formato: AAAA######HAAAAA##",
      correo: "Formato de email inválido",
      telefono: "El teléfono debe tener exactamente 10 dígitos",
      numero: "Número de dirección inválido",
      cp: "Código postal debe tener 5 dígitos",
    };
    return (
      messages[fieldName] ||
      `${getFieldLabel(fieldName)} tiene un formato inválido`
    );
  };

  // Manejar cambios en los campos
  const handleFieldChange = (
    name: string,
    value: string,
    setter: (value: string) => void
  ) => {
    setter(value);

    // Validar campo en tiempo real si ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error || undefined,
      }));
    }
  };

  // Manejar blur (cuando el campo pierde el foco)
  const handleFieldBlur = (name: string, value: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || undefined,
    }));
  };

  // Validar todo el formulario
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validar campos según el step
    const fieldsToValidate =
      step === 1
        ? [
            "nombre",
            "curp",
            "correo",
            "telefono",
            "calle",
            "numero",
            "cp",
            "colonia",
            "municipio",
            "ciudad",
            "estado",
          ]
        : step === 2
        ? ["terminosAceptados"]
        : [];

    fieldsToValidate.forEach((fieldName) => {
      let value = "";

      // Obtener valor actual del campo
      switch (fieldName) {
        case "nombre":
          value = nombre;
          break;
        case "curp":
          value = curp;
          break;
        case "correo":
          value = correo;
          break;
        case "telefono":
          value = telefono;
          break;
        case "calle":
          value = calle;
          break;
        case "numero":
          value = numero;
          break;
        case "cp":
          value = cp;
          break;
        case "colonia":
          value = colonia;
          break;
        case "municipio":
          value = municipio;
          break;
        case "ciudad":
          value = ciudad;
          break;
        case "estado":
          value = estado;
          break;
        case "terminosAceptados":
          value = terminosAceptados ? "true" : "";
          break;
      }

      const error = validateField(fieldName, value);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Marcar todos los campos como tocados
    const newTouched: { [key: string]: boolean } = {};
    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched((prev) => ({ ...prev, ...newTouched }));

    return isValid;
  };

  // Componente para mostrar errores
  const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    if (!errors[fieldName] || !touched[fieldName]) return null;

    return <div className="text-red-500 text-xs mt-1">{errors[fieldName]}</div>;
  };

  // Obtener clase CSS para input con error
  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-3 py-2 border rounded text-sm text-gray-700";
    const errorClass =
      errors[fieldName] && touched[fieldName] ? "border-red-500" : "";
    const successClass =
      !errors[fieldName] && touched[fieldName] ? "border-green-500" : "";

    return `${baseClass} ${errorClass} ${successClass}`;
  };

  useEffect(() => {
    const data = localStorage.getItem("resumenPedido");
    if (data) {
      const parsed = JSON.parse(data);
      setResumen(parsed);
      setComentario(parsed.comentario || "");
    }

    // Verificamos si hay una dirección pasada por query param
    const direccionEdit = searchParams.get("edit");
    if (direccionEdit) {
      try {
        const direccionDecodificada = JSON.parse(
          decodeURIComponent(direccionEdit)
        );
        // Precarga campos
        setNombre(direccionDecodificada.nombre || "");
        setCurp(direccionDecodificada.curp || "");
        setCorreo(direccionDecodificada.correo || "");
        setTelefono(direccionDecodificada.telefono || "");
        setCalle(direccionDecodificada.direccion || "");
        setNumero(direccionDecodificada.numero || "");
        setCp(direccionDecodificada.cp || "");
        setColonia(direccionDecodificada.colonia || "");
        setMunicipio(direccionDecodificada.municipio || "");
        setCiudad(direccionDecodificada.ciudad || "");
        setEstado(direccionDecodificada.estado || "");
      } catch (err) {
        console.error("Error al decodificar dirección:", err);
      }
    }
  }, []);

  if (!resumen) return null;

  const { productos, subtotal, envio, total } = resumen;

  const nextStep = () => {
    if (validateForm()) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="max-w-6xl mx-auto p-6">
      {/* Progreso de pasos */}
      <div className="flex justify-between items-center mb-8 border-b pb-2 text-sm text-gray-600 font-medium">
        {["1. ENVÍO", "2. PAGO", "3. PEDIDO REALIZADO"].map((label, index) => (
          <div
            key={index}
            className={`flex-1 text-center ${
              step === index + 1 ? "text-[#190E46]" : "text-gray-400"
            }`}
          >
            <div
              className={`border-b-4 ${
                step === index + 1 ? "border-[#190E46]" : "border-gray-300"
              } pb-1`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Contenido por paso */}
      <div className="grid md:grid-cols-3 gap-8 text-[#190E46]">
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold">INFORMACIÓN DEL ENVÍO</h2>
              <a href="/Direcciones" className="underline">
                Mis direcciones
              </a>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) =>
                      handleFieldChange("nombre", e.target.value, setNombre)
                    }
                    onBlur={() => handleFieldBlur("nombre", nombre)}
                    placeholder="Nombre"
                    className={getInputClassName("nombre")}
                  />
                  <ErrorMessage fieldName="nombre" />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="RFC/CURP"
                    value={curp}
                    onChange={(e) =>
                      handleFieldChange(
                        "curp",
                        e.target.value.toUpperCase(),
                        setCurp
                      )
                    }
                    onBlur={() => handleFieldBlur("curp", curp)}
                    className={getInputClassName("curp")}
                  />
                  <ErrorMessage fieldName="curp" />
                </div>

                <div>
                  <input
                    type="email"
                    value={correo}
                    placeholder="Email"
                    onChange={(e) =>
                      handleFieldChange("correo", e.target.value, setCorreo)
                    }
                    onBlur={() => handleFieldBlur("correo", correo)}
                    className={getInputClassName("correo")}
                  />
                  <ErrorMessage fieldName="correo" />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) =>
                      handleFieldChange("telefono", e.target.value, setTelefono)
                    }
                    onBlur={() => handleFieldBlur("telefono", telefono)}
                    className={getInputClassName("telefono")}
                  />
                  <ErrorMessage fieldName="telefono" />
                </div>

                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Información adicional"
                    value={informacionAdicional}
                    onChange={(e) => setInformacionAdicional(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold">DIRECCIÓN DE ENVÍO</h2>
              <div className="space-y-2">
                <div>
                  <input
                    type="text"
                    placeholder="Calle"
                    value={calle}
                    onChange={(e) =>
                      handleFieldChange("calle", e.target.value, setCalle)
                    }
                    onBlur={() => handleFieldBlur("calle", calle)}
                    className={getInputClassName("calle")}
                  />
                  <ErrorMessage fieldName="calle" />
                </div>

                <div className="flex gap-5">
                  <div className="flex-1">
                    <input
                      onChange={(e) =>
                        handleFieldChange("numero", e.target.value, setNumero)
                      }
                      onBlur={() => handleFieldBlur("numero", numero)}
                      value={numero}
                      type="text"
                      placeholder="Número*"
                      className={getInputClassName("numero")}
                    />
                    <ErrorMessage fieldName="numero" />
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Número interior"
                      value={numeroInterior}
                      onChange={(e) => setNumeroInterior(e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                    />
                  </div>

                  <div className="flex-1">
                    <input
                      value={cp}
                      onChange={(e) =>
                        handleFieldChange("cp", e.target.value, setCp)
                      }
                      onBlur={() => handleFieldBlur("cp", cp)}
                      type="text"
                      placeholder="Código Postal"
                      className={getInputClassName("cp")}
                    />
                    <ErrorMessage fieldName="cp" />
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={colonia}
                      onChange={(e) =>
                        handleFieldChange("colonia", e.target.value, setColonia)
                      }
                      onBlur={() => handleFieldBlur("colonia", colonia)}
                      placeholder="Colonia"
                      className={getInputClassName("colonia")}
                    />
                    <ErrorMessage fieldName="colonia" />
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      onChange={(e) =>
                        handleFieldChange(
                          "municipio",
                          e.target.value,
                          setMunicipio
                        )
                      }
                      onBlur={() => handleFieldBlur("municipio", municipio)}
                      value={municipio}
                      placeholder="Municipio"
                      className={getInputClassName("municipio")}
                    />
                    <ErrorMessage fieldName="municipio" />
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Ciudad"
                      value={ciudad}
                      onChange={(e) =>
                        handleFieldChange("ciudad", e.target.value, setCiudad)
                      }
                      onBlur={() => handleFieldBlur("ciudad", ciudad)}
                      className={getInputClassName("ciudad")}
                    />
                    <ErrorMessage fieldName="ciudad" />
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Estado"
                      onChange={(e) =>
                        handleFieldChange("estado", e.target.value, setEstado)
                      }
                      onBlur={() => handleFieldBlur("estado", estado)}
                      value={estado}
                      className={getInputClassName("estado")}
                    />
                    <ErrorMessage fieldName="estado" />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Referencia de la dirección (ej. Casa)"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="max-w-xl mx-auto p-6 text-sm font-sans text-neutral-900">
              <h2 className="text-lg font-semibold mb-4">MÉTODO DE PAGO</h2>

              <div className="space-y-4 border border-dashed p-4">
                <label className="block border border-neutral-300 p-4 rounded cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="opcion1"
                      className="accent-black"
                      checked={metodoSeleccionado === "opcion1"}
                      onChange={(e) => setMetodoSeleccionado(e.target.value)}
                    />
                    <span className="font-medium">Tarjeta de Crédito</span>
                  </div>
                  <p className="text-neutral-500 mt-2 text-sm">
                    Paga con cualquier tarjeta de crédito o débito.
                  </p>
                </label>

                <label className="block border border-neutral-300 p-4 rounded cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="opcion2"
                      className="accent-black"
                      checked={metodoSeleccionado === "opcion2"}
                      onChange={(e) => setMetodoSeleccionado(e.target.value)}
                    />
                    <span className="font-medium">Transferencia Bancaria</span>
                  </div>
                  <p className="text-neutral-500 mt-2 text-sm">
                    Te enviaremos los datos para que realices tu transferencia.
                  </p>
                </label>
              </div>

              <div className="mt-6 space-y-2">
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={terminosAceptados}
                      onChange={(e) => {
                        setTerminosAceptados(e.target.checked);
                        // Limpiar error si acepta términos
                        if (e.target.checked && errors.terminosAceptados) {
                          setErrors((prev) => ({
                            ...prev,
                            terminosAceptados: undefined,
                          }));
                        }
                      }}
                      onBlur={() =>
                        handleFieldBlur(
                          "terminosAceptados",
                          terminosAceptados ? "true" : ""
                        )
                      }
                    />
                    <span>
                      ACEPTO LOS{" "}
                      <a
                        href="#"
                        className="text-pink-600 underline font-semibold"
                      >
                        TÉRMINOS Y CONDICIONES DE COMPRA
                      </a>
                      .
                    </span>
                  </label>
                  <ErrorMessage fieldName="terminosAceptados" />
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  Nosotros, [xxxxxxx], podremos comunicarnos con usted respecto
                  a productos de tienda...
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">PEDIDO REALIZADO</h2>
              <p>Gracias por tu compra. Aquí va la confirmación del pedido.</p>
            </div>
          )}

          {/* Botones */}
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              >
                Anterior
              </button>
            )}
            {step < 3 && (
              <button
                onClick={nextStep}
                className="bg-[#190E46] text-white py-2 px-6 rounded hover:bg-indigo-800 ml-auto"
              >
                Continuar
              </button>
            )}
          </div>
        </div>

        {/* Resumen del pedido (siempre visible) */}
        <div className="bg-gray-100 p-4 rounded-lg border h-fit">
          <h3 className="bg-[#190E46] text-white font-bold w-full py-2 px-4 rounded-3xl mb-4 text-center">
            RESUMEN DEL PEDIDO
          </h3>

          {/* Productos */}
          <div className="text-sm text-gray-700 space-y-4 mb-3">
            {/* Subtotal y envío */}
            <div className="space-y-2"></div>

            {/* Productos */}
            <div className="space-y-2">
              {productos.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-[#190E46]">
                      {p.equipo}
                    </span>
                    <span className="text-xs text-gray-500">
                      Cantidad: {p.cantidad}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-green-700">
                    ${p.precio * p.cantidad}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between items-center border-b pb-1">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-sm font-semibold text-green-700">
                ${subtotal}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-1">
              <span className="text-gray-600">Envío</span>
              <span className="text-sm font-semibold text-blue-600">
                ${envio}
              </span>
            </div>
            {/* Total final */}
            <div className="flex justify-between font-semibold text-base text-[#190E46]">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Comentario solo en Step 1 */}
          {step === 1 && (
            <textarea
              placeholder="Agregar un Comentario"
              className="w-full p-2 border rounded resize-none"
              rows={4}
              value={comentario}
              onChange={(e) => {
                setComentario(e.target.value);
                // Actualizar localStorage también si deseas
                const actualizado = { ...resumen, comentario: e.target.value };
                setResumen(actualizado);
                localStorage.setItem(
                  "resumenPedido",
                  JSON.stringify(actualizado)
                );
              }}
            />
          )}

          {/* Dirección de Envío si ya está disponible */}
          {step >= 2 && (
            <div className="space-y-3.5">
              <div className="bg-white p-4 rounded-t-xl border h-fit">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">
                  📦 Detalles del envío
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-600">Nombre: </span>
                    {nombre}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">
                      Dirección:{" "}
                    </span>
                    {calle} #{numero} {colonia}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Ciudad: </span>
                    {ciudad}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">
                      Municipio:{" "}
                    </span>
                    {municipio}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Estado: </span>
                    {estado}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">C.P.: </span>
                    {cp}
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-b-xl border h-fit">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">
                  📦 Detalles de la paquetería
                </h3>
                Tipo de Envío: Express
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnvioFormulario;
