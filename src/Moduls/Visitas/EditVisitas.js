import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import VisitaStepper from "./Steps/VisitaStepper";
import MethodGet from "../../Config/Service";
import VisitasContext from "../../Context/Visitas/VisitasContext";

export default function EditVisitas() {
  const { id } = useParams();
  const [visita, setVisita] = useState(null);
  const { EditVisitas } = useContext(VisitasContext);

  useEffect(() => {
    if (!id) return;

    MethodGet(`/editarVisita/${id}`)
      .then((res) => {
        const data = res.data;

        const eventosAsistio = {};
        const eventosCandidato = {};

        data.client_visit?.events?.forEach((evento) => {
          if (evento.tipo === "asistio") {
            eventosAsistio[evento.nombre_evento] = true;
          }

          if (evento.tipo === "candidato") {
            eventosCandidato[evento.nombre_evento] = true;
          }
        });

        const requirements = data.client_visit?.requirements;
        const training_data = data.training_data;
        const temasRevisados = {};

        (data.distributor_visit?.temas_revisados || []).forEach((tema) => {
          temasRevisados[tema] = true;
        });
        setVisita({
          ...data,
          ...data.client_visit,

          logo_preview: data.client_visit?.url,
          logo_existente: true,
          logo_path: data.client_visit?.logo_path,

          contactos:
            data.client_visit?.contacts?.map((contacto) => ({
              id: contacto.id,
              nombre: contacto.nombre,
              puesto: contacto.puesto,
              email: contacto.email,
              telefono: contacto.telefono,
            })) ?? [],

          fleet_info:
            data.client_visit?.fleet_info?.map((info) => ({
              id: info.id,
              marca: info.marca,
              modelo: info.modelo,
              capacidad_carga: info.capacidad_carga,
              cantidad: info.cantidad,
              porcentaje_flota: info.porcentaje_flota,
              comentarios_aplicacion: info.comentarios_aplicacion,
            })) ?? [],

          sales_history:
            data.client_visit?.sales_history?.map((history) => ({
              id: history.id,
              anio: history.anio,
              cantidad: history.cantidad,
            })) ?? [],

          eventos_asistio: eventosAsistio,
          eventos_candidato: eventosCandidato,

          ...requirements,
          demo: requirements?.demo ? "si" : "no",

          followup_agreements:
            data.followup_agreements?.map((agreement) => ({
              id: agreement.id,
              acuerdo: agreement.acuerdo,
              responsable: agreement.responsable,
              fecha_compromiso: agreement.fecha_compromiso
                ? agreement.fecha_compromiso.substring(0, 10)
                : "",
            })) ?? [],

          ...training_data,

          participantes:
            data.distributor_visit?.participantes?.map((participante) => ({
              nombre: participante.nombre,
            })) ?? [],

          temas_revisados: temasRevisados,

          leads:
            data.distributor_visit?.leads?.map((lead) => ({
              id: lead.id,
              cliente: lead.cliente,
              modelo_interes: lead.modelo_interes,
              porcentaje_avance: lead.porcentaje_avance,
              comentarios: lead.comentarios,
            })) ?? [],

          distribuidor: data.distributor_visit?.distribuidor,
          plaza: data.distributor_visit?.plaza,
          grupo: data.distributor_visit?.grupo,

          commercial_indicators:
            data.distributor_visit?.commercial_indicators?.map((indicator) => ({
              id: indicator.id,
              modelo: indicator.modelo,
              bp_2025: indicator.bp_2025,
              whole_ytd: indicator.whole_ytd,
              porcentaje_avance: indicator.porcentaje_avance,
              retail_ytd: indicator.retail_ytd,
              inventario: indicator.inventario,
              back_order: indicator.back_order,
            })) ?? [],

          evidencias:
            data.attachments?.map((file) => ({
              id: file.id,
              filename: file.filename,
              tipo: file.tipo,
              preview: file.url,
              existente: true,
            })) ?? [],
        });
      })
      .catch(console.log);
  }, [id]);

  return (
    <Layout>
      <VisitaStepper
        mode="edit"
        defaultValues={visita}
        onSubmit={EditVisitas}
      />
    </Layout>
  );
}
