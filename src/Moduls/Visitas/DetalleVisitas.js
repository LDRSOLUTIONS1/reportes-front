import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import VisitasContext from "../../Context/Visitas/VisitasContext";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  Avatar,
  ImageList,
  ImageListItem,
  Stack,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SchoolIcon from "@mui/icons-material/School";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const DetalleVisitas = () => {
  const { id } = useParams();

  const { visita, GetVisita } = useContext(VisitasContext);

  useEffect(() => {
    if (id) {
      GetVisita(id);
    }
  }, [id]);

  if (!visita) {
    return (
      <Layout>
        <Box sx={{ p: 3 }}>
          <Typography>Cargando información de la visita...</Typography>
        </Box>
      </Layout>
    );
  }

  const esClienteDirecto = visita.visit_type === "cliente_directo";

  const datosCliente = visita.client_visit;
  const datosDistribuidor = visita.distributor_visit;

  const tipoVisita = esClienteDirecto ? "Cliente directo" : "Distribuidor";

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Detalle de visita
              </Typography>

              <Typography color="text.secondary">
                Reporte #{visita.id}
              </Typography>
            </Box>

            <Chip
              icon={esClienteDirecto ? <BusinessIcon /> : <GroupsIcon />}
              label={tipoVisita}
              color={esClienteDirecto ? "primary" : "secondary"}
              sx={{
                fontWeight: 600,
                px: 1,
              }}
            />
          </Stack>
        </Box>

        <SectionCard title="Información general" icon={<AssignmentIcon />}>
          <Grid container spacing={3}>
            <InfoItem label="Tipo de visita" value={visita.tipo_visita} />

            <InfoItem
              label="Fecha de inicio"
              value={formatDate(visita.fecha_inicio)}
              icon={<CalendarMonthIcon />}
            />

            <InfoItem
              label="Fecha de término"
              value={formatDate(visita.fecha_fin)}
              icon={<CalendarMonthIcon />}
            />

            <InfoItem label="Segmento" value={visita.segmento} />

            <InfoItem label="Objetivo" value={visita.objetivo} xs={12} />

            <InfoItem
              label="Logros / Estrategia"
              value={visita.logros_estrategia}
              xs={12}
            />
          </Grid>
        </SectionCard>

        {esClienteDirecto && datosCliente && (
          <>
            <SectionCard
              title="Información del cliente"
              icon={<BusinessIcon />}
            >
              <Grid container spacing={3}>
                <InfoItem
                  label="Razón social"
                  value={datosCliente.razon_social}
                  xs={12}
                  md={6}
                />

                <InfoItem
                  label="Tipo de cliente"
                  value={datosCliente.tipo_cliente}
                  xs={12}
                  md={6}
                />

                <InfoItem
                  label="Ubicaciones"
                  value={datosCliente.ubicaciones}
                  xs={12}
                  md={6}
                />

                <InfoItem
                  label="Tamaño de flota"
                  value={datosCliente.tamanio_flota}
                  xs={12}
                  md={6}
                />

                <InfoItem
                  label="Giro"
                  value={datosCliente.giro}
                  xs={12}
                  md={6}
                />

                <InfoItem
                  label="Rutas"
                  value={datosCliente.rutas}
                  xs={12}
                  md={6}
                />

                <InfoItem
                  label="Cobertura"
                  value={datosCliente.cobertura}
                  xs={12}
                  md={6}
                />

                <InfoItem
                  label="Edad promedio de flota"
                  value={datosCliente.edad_promedio_flota}
                  xs={12}
                  md={6}
                />
              </Grid>
            </SectionCard>

            {datosCliente.contacts?.length > 0 && (
              <SectionCard title="Contactos" icon={<PersonIcon />}>
                <Grid container spacing={2}>
                  {datosCliente.contacts.map((contacto) => (
                    <Grid item xs={12} md={6} key={contacto.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" fontWeight={600}>
                            {contacto.nombre}
                          </Typography>

                          <Typography color="text.secondary">
                            {contacto.puesto}
                          </Typography>

                          <Divider sx={{ my: 1.5 }} />

                          <Typography variant="body2">
                            <strong>Email:</strong> {contacto.email}
                          </Typography>

                          <Typography variant="body2">
                            <strong>Teléfono:</strong> {contacto.telefono}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosCliente.fleet_info?.length > 0 && (
              <SectionCard title="Información de flota" icon={<BusinessIcon />}>
                <Grid container spacing={2}>
                  {datosCliente.fleet_info.map((flota) => (
                    <Grid item xs={12} md={6} lg={4} key={flota.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography fontWeight={700}>
                            {flota.marca}
                          </Typography>

                          <Typography color="text.secondary">
                            Modelo: {flota.modelo}
                          </Typography>

                          <Divider sx={{ my: 1 }} />

                          <Typography variant="body2">
                            Capacidad de carga: {flota.capacidad_carga}
                          </Typography>

                          <Typography variant="body2">
                            Cantidad: {flota.cantidad}
                          </Typography>

                          <Typography variant="body2">
                            % de flota: {flota.porcentaje_flota}%
                          </Typography>

                          <Typography variant="body2">
                            Comentarios: {flota.comentarios_aplicacion}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosCliente.sales_history?.length > 0 && (
              <SectionCard
                title="Historial de ventas"
                icon={<AssignmentIcon />}
              >
                <Grid container spacing={2}>
                  {datosCliente.sales_history.map((venta) => (
                    <Grid item xs={12} sm={6} md={4} key={venta.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h5" fontWeight={700}>
                            {venta.anio}
                          </Typography>

                          <Typography color="text.secondary">
                            Cantidad: {venta.cantidad}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosCliente.events?.length > 0 && (
              <SectionCard title="Eventos" icon={<CalendarMonthIcon />}>
                <Grid container spacing={2}>
                  {datosCliente.events.map((evento) => (
                    <Grid item xs={12} md={6} key={evento.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography fontWeight={600}>
                              {evento.nombre_evento}
                            </Typography>

                            <Chip
                              size="small"
                              label={evento.tipo}
                              color={
                                evento.tipo === "asistio"
                                  ? "success"
                                  : "warning"
                              }
                            />
                          </Stack>

                          {evento.otro_evento && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              <strong>Otro:</strong> {evento.otro_evento}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosCliente.requirements && (
              <SectionCard title="Requerimientos" icon={<AssignmentIcon />}>
                <Grid container spacing={3}>
                  <InfoItem
                    label="Modelo de interés"
                    value={datosCliente.requirements.modelo_interes}
                  />

                  <InfoItem
                    label="Tipo de carrocería"
                    value={datosCliente.requirements.tipo_carroceria}
                  />

                  <InfoItem
                    label="Proyección de compra"
                    value={datosCliente.requirements.proyeccion_compra}
                  />

                  <InfoItem
                    label="Financiamiento"
                    value={datosCliente.requirements.financiamiento}
                  />

                  <InfoItem
                    label="Tiempo de entrega"
                    value={datosCliente.requirements.tiempo_entrega}
                  />

                  <InfoItem
                    label="Lugar de entrega"
                    value={datosCliente.requirements.lugar_entrega}
                  />

                  <InfoItem
                    label="Distribuidor"
                    value={datosCliente.requirements.distribuidor}
                  />

                  <InfoItem
                    label="Demo"
                    value={datosCliente.requirements.demo ? "Sí" : "No"}
                  />

                  <InfoItem
                    label="Otro"
                    value={datosCliente.requirements.otro}
                  />
                </Grid>
              </SectionCard>
            )}
          </>
        )}

        {!esClienteDirecto && datosDistribuidor && (
          <>
            <SectionCard
              title="Información del distribuidor"
              icon={<GroupsIcon />}
            >
              <Grid container spacing={3}>
                <InfoItem
                  label="Distribuidor"
                  value={datosDistribuidor.distribuidor}
                  xs={12}
                  md={4}
                />

                <InfoItem
                  label="Plaza"
                  value={datosDistribuidor.plaza}
                  xs={12}
                  md={4}
                />

                <InfoItem
                  label="Grupo"
                  value={datosDistribuidor.grupo}
                  xs={12}
                  md={4}
                />
              </Grid>
            </SectionCard>

            {datosDistribuidor.temas_revisados?.length > 0 && (
              <SectionCard title="Temas revisados" icon={<AssignmentIcon />}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {datosDistribuidor.temas_revisados.map((tema, index) => (
                    <Chip key={index} label={tema} variant="outlined" />
                  ))}
                </Stack>
              </SectionCard>
            )}

            {datosDistribuidor.participantes?.length > 0 && (
              <SectionCard title="Participantes" icon={<GroupsIcon />}>
                <Grid container spacing={2}>
                  {datosDistribuidor.participantes.map(
                    (participante, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography fontWeight={600}>
                              {participante.nombre}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ),
                  )}
                </Grid>
              </SectionCard>
            )}

            {datosDistribuidor.leads?.length > 0 && (
              <SectionCard title="Leads" icon={<PersonIcon />}>
                <Grid container spacing={2}>
                  {datosDistribuidor.leads.map((lead) => (
                    <Grid item xs={12} md={6} key={lead.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" fontWeight={600}>
                            {lead.cliente}
                          </Typography>

                          <Typography>
                            Modelo de interés: {lead.modelo_interes}
                          </Typography>

                          <Typography>
                            Avance: {lead.porcentaje_avance}%
                          </Typography>

                          <Typography color="text.secondary" sx={{ mt: 1 }}>
                            {lead.comentarios}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosDistribuidor.commercial_indicators?.length > 0 && (
              <SectionCard
                title="Indicadores comerciales"
                icon={<AssignmentIcon />}
              >
                <Grid container spacing={2}>
                  {datosDistribuidor.commercial_indicators.map((indicador) => (
                    <Grid item xs={12} md={6} lg={4} key={indicador.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" fontWeight={700}>
                            {indicador.modelo}
                          </Typography>

                          <Divider sx={{ my: 1.5 }} />

                          <Typography variant="body2">
                            BP 2025: {indicador.bp_2025}
                          </Typography>

                          <Typography variant="body2">
                            Whole YTD: {indicador.whole_ytd}
                          </Typography>

                          <Typography variant="body2">
                            Retail YTD: {indicador.retail_ytd}
                          </Typography>

                          <Typography variant="body2">
                            Avance: {indicador.porcentaje_avance}%
                          </Typography>

                          <Typography variant="body2">
                            Inventario: {indicador.inventario}
                          </Typography>

                          <Typography variant="body2">
                            Back order: {indicador.back_order}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosDistribuidor.comentarios_adicionales && (
              <SectionCard
                title="Comentarios adicionales"
                icon={<AssignmentIcon />}
              >
                <Typography>
                  {datosDistribuidor.comentarios_adicionales}
                </Typography>
              </SectionCard>
            )}
          </>
        )}

        {visita.followup_agreements?.length > 0 && (
          <SectionCard title="Acuerdos y seguimiento" icon={<HandshakeIcon />}>
            <Grid container spacing={2}>
              {visita.followup_agreements.map((acuerdo) => (
                <Grid item xs={12} md={6} key={acuerdo.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" fontWeight={600}>
                        {acuerdo.acuerdo}
                      </Typography>

                      <Divider sx={{ my: 1.5 }} />

                      <Typography variant="body2">
                        <strong>Responsable:</strong> {acuerdo.responsable}
                      </Typography>

                      <Typography variant="body2">
                        <strong>Seguimiento:</strong> {acuerdo.seguimiento}
                      </Typography>

                      <Typography variant="body2">
                        <strong>Fecha compromiso:</strong>{" "}
                        {formatDate(acuerdo.fecha_compromiso)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        )}

        {visita.training_data && (
          <SectionCard title="Capacitación" icon={<SchoolIcon />}>
            <Grid container spacing={3}>
              <InfoItem label="Tipo" value={visita.training_data.tipo} />

              <InfoItem
                label="Tema principal"
                value={visita.training_data.tema_principal}
              />

              <InfoItem
                label="Número de personas"
                value={visita.training_data.num_personas}
              />

              <InfoItem
                label="Comentarios"
                value={visita.training_data.comentarios}
                xs={12}
              />
            </Grid>
          </SectionCard>
        )}

        {visita.attachments?.length > 0 && (
          <SectionCard title="Evidencias" icon={<PhotoLibraryIcon />}>
            <ImageList cols={3} gap={16}>
              {visita.attachments.map((archivo) => (
                <ImageListItem key={archivo.id}>
                  <img
                    src={archivo.url}
                    alt={archivo.filename}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </SectionCard>
        )}
      </Box>
    </Layout>
  );
};

const SectionCard = ({ title, icon, children }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          {icon}

          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {children}
      </CardContent>
    </Card>
  );
};

const InfoItem = ({ label, value, xs = 12, md = 4 }) => {
  return (
    <Grid item xs={xs} md={md}>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mb: 0.5 }}
      >
        {label}
      </Typography>

      <Typography variant="body1" fontWeight={500}>
        {value ?? "—"}
      </Typography>
    </Grid>
  );
};

const formatDate = (date) => {
  if (!date) return "—";

  const value = String(date).substring(0, 10);

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
};

export default DetalleVisitas;
