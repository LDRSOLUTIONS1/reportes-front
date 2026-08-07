import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  IconButton,
  Skeleton,
  Dialog,
  Tooltip,
  Fade,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SchoolIcon from "@mui/icons-material/School";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

// ---------------------------------------------------------------------------
// Tokens de diseño — paleta pensada para un contexto industrial/comercial
// (visitas de campo a clientes de flota y distribuidores).
// ---------------------------------------------------------------------------
const palette = {
  ink: "#1C2530",
  muted: "#64748B",
  canvas: "#F5F6F8",
  hairline: "#E6E8EC",
  clienteDirecto: "#2E6BE0", // azul acero — cliente directo
  distribuidor: "#7A5CDB", // índigo — red de distribuidores
  acuerdos: "#D98C2B", // ámbar — compromisos / seguimiento
  capacitacion: "#1E9E8B", // verde azulado — formación
  evidencias: "#52606D", // pizarra — evidencia documental
  general: "#1C2530",
};

const DetalleVisitas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { visita, GetVisita } = useContext(VisitasContext);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (id) {
      GetVisita(id);
    }
  }, [id]);

  if (!visita) {
    return (
      <Layout>
        <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: "auto" }}>
          <Skeleton variant="text" width={220} height={44} />
          <Skeleton variant="text" width={140} sx={{ mb: 3 }} />
          {[0, 1, 2].map((i) => (
            <Card key={i} variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent>
                <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
                <Grid container spacing={3}>
                  {[0, 1, 2].map((j) => (
                    <Grid item xs={12} md={4} key={j}>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="85%" height={28} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Layout>
    );
  }

  const esClienteDirecto = visita.visit_type === "cliente_directo";
  const datosCliente = visita.client_visit;
  const datosDistribuidor = visita.distributor_visit;
  const tipoVisita = esClienteDirecto ? "Cliente directo" : "Distribuidor";
  const accentPrincipal = esClienteDirecto
    ? palette.clienteDirecto
    : palette.distribuidor;

  return (
    <Layout>
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: "auto" }}>
        {/* ---------------------------------------------------------------- */}
        {/* Encabezado                                                       */}
        {/* ---------------------------------------------------------------- */}
        <Card
          variant="outlined"
          sx={{
            mb: 3,
            borderRadius: 3,
            borderColor: palette.hairline,
            overflow: "hidden",
          }}
        >
          <Box sx={{ height: 5, background: accentPrincipal }} />
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Tooltip title="Volver al listado">
                  <IconButton
                    onClick={() => navigate(-1)}
                    sx={{
                      border: `1px solid ${palette.hairline}`,
                      borderRadius: 2,
                      color: palette.ink,
                    }}
                  >
                    <ArrowBackRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Avatar
                  sx={{
                    bgcolor: `${accentPrincipal}1A`,
                    color: accentPrincipal,
                    width: 48,
                    height: 48,
                  }}
                >
                  {esClienteDirecto ? <BusinessIcon /> : <GroupsIcon />}
                </Avatar>

                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    letterSpacing="-0.02em"
                    sx={{ color: palette.ink, lineHeight: 1.2 }}
                  >
                    Detalle de visita
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: palette.muted, fontWeight: 500 }}
                  >
                    Reporte&nbsp;#{visita.id}
                  </Typography>
                </Box>
              </Stack>

              <Chip
                icon={
                  esClienteDirecto ? (
                    <BusinessIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <GroupsIcon sx={{ fontSize: 16 }} />
                  )
                }
                label={tipoVisita}
                sx={{
                  fontWeight: 700,
                  px: 1,
                  height: 32,
                  bgcolor: `${accentPrincipal}14`,
                  color: accentPrincipal,
                  border: `1px solid ${accentPrincipal}33`,
                  "& .MuiChip-icon": { color: accentPrincipal },
                }}
              />
            </Stack>
          </CardContent>
        </Card>

        <SectionCard
          title="Información general"
          icon={<AssignmentIcon sx={{ fontSize: 20 }} />}
          accent={palette.general}
        >
          <Grid container spacing={3}>
            <InfoItem label="Tipo de visita" value={visita.tipo_visita} />
            <InfoItem
              label="Fecha de inicio"
              value={formatDate(visita.fecha_inicio)}
            />
            <InfoItem
              label="Fecha de término"
              value={formatDate(visita.fecha_fin)}
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
              icon={<BusinessIcon sx={{ fontSize: 20 }} />}
              accent={palette.clienteDirecto}
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
                <InfoItem label="Giro" value={datosCliente.giro} xs={12} md={6} />
                <InfoItem label="Rutas" value={datosCliente.rutas} xs={12} md={6} />
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
              <SectionCard
                title="Contactos"
                icon={<PersonIcon sx={{ fontSize: 20 }} />}
                accent={palette.clienteDirecto}
              >
                <Grid container spacing={2}>
                  {datosCliente.contacts.map((contacto) => (
                    <Grid item xs={12} md={6} key={contacto.id}>
                      <InnerCard>
                        <Stack direction="row" spacing={1.5} alignItems="flex-start">
                          <Avatar
                            sx={{
                              bgcolor: `${palette.clienteDirecto}14`,
                              color: palette.clienteDirecto,
                              width: 36,
                              height: 36,
                              fontSize: 14,
                              fontWeight: 700,
                            }}
                          >
                            {getInitials(contacto.nombre)}
                          </Avatar>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography fontWeight={700} sx={{ color: palette.ink }}>
                              {contacto.nombre}
                            </Typography>
                            <Typography variant="body2" sx={{ color: palette.muted }}>
                              {contacto.puesto || "—"}
                            </Typography>
                            <Divider sx={{ my: 1.25 }} />
                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                <Box component="span" sx={{ color: palette.muted }}>
                                  Email:{" "}
                                </Box>
                                {contacto.email || "—"}
                              </Typography>
                              <Typography variant="body2">
                                <Box component="span" sx={{ color: palette.muted }}>
                                  Teléfono:{" "}
                                </Box>
                                {contacto.telefono || "—"}
                              </Typography>
                            </Stack>
                          </Box>
                        </Stack>
                      </InnerCard>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosCliente.fleet_info?.length > 0 && (
              <SectionCard
                title="Información de flota"
                icon={<LocalShippingRoundedIcon sx={{ fontSize: 20 }} />}
                accent={palette.clienteDirecto}
              >
                <Grid container spacing={2}>
                  {datosCliente.fleet_info.map((flota) => (
                    <Grid item xs={12} md={6} lg={4} key={flota.id}>
                      <InnerCard>
                        <Typography fontWeight={700} sx={{ color: palette.ink }}>
                          {flota.marca}
                        </Typography>
                        <Typography variant="body2" sx={{ color: palette.muted }}>
                          Modelo: {flota.modelo}
                        </Typography>
                        <Divider sx={{ my: 1.25 }} />
                        <Stack spacing={0.5}>
                          <Typography variant="body2">
                            Capacidad de carga: {flota.capacidad_carga}
                          </Typography>
                          <Typography variant="body2">
                            Cantidad: {flota.cantidad}
                          </Typography>
                          <Typography variant="body2">
                            % de flota: {flota.porcentaje_flota}%
                          </Typography>
                          {flota.comentarios_aplicacion && (
                            <Typography
                              variant="body2"
                              sx={{ color: palette.muted, mt: 0.5 }}
                            >
                              {flota.comentarios_aplicacion}
                            </Typography>
                          )}
                        </Stack>
                      </InnerCard>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosCliente.sales_history?.length > 0 && (
              <SectionCard
                title="Historial de ventas"
                icon={<AssignmentIcon sx={{ fontSize: 20 }} />}
                accent={palette.clienteDirecto}
              >
                <Grid container spacing={2}>
                  {datosCliente.sales_history.map((venta) => (
                    <Grid item xs={12} sm={6} md={4} key={venta.id}>
                      <InnerCard sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h4"
                          fontWeight={800}
                          sx={{ color: palette.clienteDirecto, lineHeight: 1 }}
                        >
                          {venta.anio}
                        </Typography>
                        <Typography variant="body2" sx={{ color: palette.muted, mt: 0.75 }}>
                          Cantidad: {venta.cantidad}
                        </Typography>
                      </InnerCard>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosCliente.events?.length > 0 && (
              <SectionCard
                title="Eventos"
                icon={<CalendarMonthIcon sx={{ fontSize: 20 }} />}
                accent={palette.clienteDirecto}
              >
                <Grid container spacing={2}>
                  {datosCliente.events.map((evento) => (
                    <Grid item xs={12} md={6} key={evento.id}>
                      <InnerCard>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography fontWeight={700} sx={{ color: palette.ink }}>
                            {evento.nombre_evento}
                          </Typography>
                          <Chip
                            size="small"
                            label={evento.tipo === "asistio" ? "Asistió" : evento.tipo}
                            sx={{
                              fontWeight: 700,
                              bgcolor:
                                evento.tipo === "asistio" ? "#1E9E8B14" : "#D98C2B14",
                              color: evento.tipo === "asistio" ? "#1E9E8B" : "#D98C2B",
                            }}
                          />
                        </Stack>
                        {evento.otro_evento && (
                          <Typography variant="body2" sx={{ mt: 1, color: palette.muted }}>
                            <strong style={{ color: palette.ink }}>Otro:</strong>{" "}
                            {evento.otro_evento}
                          </Typography>
                        )}
                      </InnerCard>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosCliente.requirements && (
              <SectionCard
                title="Requerimientos"
                icon={<AssignmentIcon sx={{ fontSize: 20 }} />}
                accent={palette.clienteDirecto}
              >
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
                  <InfoItem label="Otro" value={datosCliente.requirements.otro} />
                </Grid>
              </SectionCard>
            )}
          </>
        )}

        {!esClienteDirecto && datosDistribuidor && (
          <>
            <SectionCard
              title="Información del distribuidor"
              icon={<GroupsIcon sx={{ fontSize: 20 }} />}
              accent={palette.distribuidor}
            >
              <Grid container spacing={3}>
                <InfoItem
                  label="Distribuidor"
                  value={datosDistribuidor.distribuidor}
                  xs={12}
                  md={4}
                />
                <InfoItem label="Plaza" value={datosDistribuidor.plaza} xs={12} md={4} />
                <InfoItem label="Grupo" value={datosDistribuidor.grupo} xs={12} md={4} />
              </Grid>
            </SectionCard>

            {datosDistribuidor.temas_revisados?.length > 0 && (
              <SectionCard
                title="Temas revisados"
                icon={<AssignmentIcon sx={{ fontSize: 20 }} />}
                accent={palette.distribuidor}
              >
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {datosDistribuidor.temas_revisados.map((tema, index) => (
                    <Chip
                      key={index}
                      label={tema}
                      sx={{
                        bgcolor: `${palette.distribuidor}0F`,
                        color: palette.distribuidor,
                        border: `1px solid ${palette.distribuidor}33`,
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Stack>
              </SectionCard>
            )}

            {datosDistribuidor.participantes?.length > 0 && (
              <SectionCard
                title="Participantes"
                icon={<GroupsIcon sx={{ fontSize: 20 }} />}
                accent={palette.distribuidor}
              >
                <Grid container spacing={2}>
                  {datosDistribuidor.participantes.map((participante, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <InnerCard>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            sx={{
                              bgcolor: `${palette.distribuidor}14`,
                              color: palette.distribuidor,
                              width: 32,
                              height: 32,
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                          >
                            {getInitials(participante.nombre)}
                          </Avatar>
                          <Typography fontWeight={600} sx={{ color: palette.ink }}>
                            {participante.nombre}
                          </Typography>
                        </Stack>
                      </InnerCard>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosDistribuidor.leads?.length > 0 && (
              <SectionCard
                title="Leads"
                icon={<PersonIcon sx={{ fontSize: 20 }} />}
                accent={palette.distribuidor}
              >
                <Grid container spacing={2}>
                  {datosDistribuidor.leads.map((lead) => (
                    <Grid item xs={12} md={6} key={lead.id}>
                      <InnerCard>
                        <Typography fontWeight={700} sx={{ color: palette.ink }}>
                          {lead.cliente}
                        </Typography>
                        <Typography variant="body2" sx={{ color: palette.muted, mt: 0.25 }}>
                          Modelo de interés: {lead.modelo_interes}
                        </Typography>

                        <Box sx={{ mt: 1.25 }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mb: 0.5 }}
                          >
                            <Typography variant="caption" sx={{ color: palette.muted }}>
                              Avance
                            </Typography>
                            <Typography variant="caption" fontWeight={700}>
                              {lead.porcentaje_avance}%
                            </Typography>
                          </Stack>
                          <Box
                            sx={{
                              height: 6,
                              borderRadius: 999,
                              bgcolor: palette.hairline,
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              sx={{
                                height: "100%",
                                width: `${Math.min(
                                  Math.max(lead.porcentaje_avance || 0, 0),
                                  100,
                                )}%`,
                                bgcolor: palette.distribuidor,
                                borderRadius: 999,
                              }}
                            />
                          </Box>
                        </Box>

                        {lead.comentarios && (
                          <Typography
                            variant="body2"
                            sx={{ color: palette.muted, mt: 1.25 }}
                          >
                            {lead.comentarios}
                          </Typography>
                        )}
                      </InnerCard>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosDistribuidor.commercial_indicators?.length > 0 && (
              <SectionCard
                title="Indicadores comerciales"
                icon={<AssignmentIcon sx={{ fontSize: 20 }} />}
                accent={palette.distribuidor}
              >
                <Grid container spacing={2}>
                  {datosDistribuidor.commercial_indicators.map((indicador) => (
                    <Grid item xs={12} md={6} lg={4} key={indicador.id}>
                      <InnerCard>
                        <Typography fontWeight={700} sx={{ color: palette.ink }}>
                          {indicador.modelo}
                        </Typography>
                        <Divider sx={{ my: 1.25 }} />
                        <Stack spacing={0.5}>
                          <DataRow label="BP 2025" value={indicador.bp_2025} />
                          <DataRow label="Whole YTD" value={indicador.whole_ytd} />
                          <DataRow label="Retail YTD" value={indicador.retail_ytd} />
                          <DataRow
                            label="Avance"
                            value={`${indicador.porcentaje_avance}%`}
                          />
                          <DataRow label="Inventario" value={indicador.inventario} />
                          <DataRow label="Back order" value={indicador.back_order} />
                        </Stack>
                      </InnerCard>
                    </Grid>
                  ))}
                </Grid>
              </SectionCard>
            )}

            {datosDistribuidor.comentarios_adicionales && (
              <SectionCard
                title="Comentarios adicionales"
                icon={<AssignmentIcon sx={{ fontSize: 20 }} />}
                accent={palette.distribuidor}
              >
                <Typography sx={{ color: palette.ink, lineHeight: 1.7 }}>
                  {datosDistribuidor.comentarios_adicionales}
                </Typography>
              </SectionCard>
            )}
          </>
        )}

        {visita.followup_agreements?.length > 0 && (
          <SectionCard
            title="Acuerdos y seguimiento"
            icon={<HandshakeIcon sx={{ fontSize: 20 }} />}
            accent={palette.acuerdos}
          >
            <Grid container spacing={2}>
              {visita.followup_agreements.map((acuerdo) => (
                <Grid item xs={12} md={6} key={acuerdo.id}>
                  <InnerCard sx={{ borderLeft: `3px solid ${palette.acuerdos}` }}>
                    <Typography fontWeight={700} sx={{ color: palette.ink }}>
                      {acuerdo.acuerdo}
                    </Typography>
                    <Divider sx={{ my: 1.25 }} />
                    <Stack spacing={0.5}>
                      <DataRow label="Responsable" value={acuerdo.responsable} />
                      <DataRow label="Seguimiento" value={acuerdo.seguimiento} />
                      <DataRow
                        label="Fecha compromiso"
                        value={formatDate(acuerdo.fecha_compromiso)}
                      />
                    </Stack>
                  </InnerCard>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        )}

        {visita.training_data && (
          <SectionCard
            title="Capacitación"
            icon={<SchoolIcon sx={{ fontSize: 20 }} />}
            accent={palette.capacitacion}
          >
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
          <SectionCard
            title="Evidencias"
            icon={<PhotoLibraryIcon sx={{ fontSize: 20 }} />}
            accent={palette.evidencias}
          >
            <ImageList cols={3} gap={16}>
              {visita.attachments.map((archivo) => (
                <ImageListItem
                  key={archivo.id}
                  onClick={() => setLightbox(archivo)}
                  sx={{
                    cursor: "zoom-in",
                    borderRadius: 2,
                    overflow: "hidden",
                    "&:hover img": { transform: "scale(1.05)" },
                  }}
                >
                  <img
                    src={archivo.url}
                    alt={archivo.filename}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      borderRadius: 8,
                      transition: "transform 220ms ease",
                      display: "block",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </SectionCard>
        )}
      </Box>

      {/* Lightbox de evidencias */}
      <Dialog
        open={Boolean(lightbox)}
        onClose={() => setLightbox(null)}
        maxWidth="lg"
        TransitionComponent={Fade}
        PaperProps={{ sx: { bgcolor: "transparent", boxShadow: "none" } }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setLightbox(null)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.55)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
          {lightbox && (
            <img
              src={lightbox.url}
              alt={lightbox.filename}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                display: "block",
                borderRadius: 8,
              }}
            />
          )}
        </Box>
      </Dialog>
    </Layout>
  );
};

// ---------------------------------------------------------------------------
// Subcomponentes de presentación
// ---------------------------------------------------------------------------

const SectionCard = ({ title, icon, accent = palette.general, children }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 3,
        borderColor: palette.hairline,
        transition: "box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(16, 24, 40, 0.06)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
          <Avatar
            variant="rounded"
            sx={{
              width: 34,
              height: 34,
              borderRadius: 1.5,
              bgcolor: `${accent}14`,
              color: accent,
            }}
          >
            {icon}
          </Avatar>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ color: palette.ink, letterSpacing: "-0.01em" }}
          >
            {title}
          </Typography>
        </Stack>

        {children}
      </CardContent>
    </Card>
  );
};

const InnerCard = ({ children, sx = {} }) => (
  <Card
    variant="outlined"
    sx={{
      height: "100%",
      borderRadius: 2,
      borderColor: palette.hairline,
      bgcolor: palette.canvas,
      p: 2,
      transition: "border-color 150ms ease, transform 150ms ease",
      "&:hover": { borderColor: "#D0D4DA" },
      ...sx,
    }}
  >
    {children}
  </Card>
);

const InfoItem = ({ label, value, xs = 12, md = 4 }) => {
  return (
    <Grid item xs={xs} md={md}>
      <Typography
        variant="caption"
        display="block"
        sx={{
          mb: 0.5,
          color: palette.muted,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: 11,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          color: value ? palette.ink : "#B0B6BE",
        }}
      >
        {value ?? "Sin dato"}
      </Typography>
    </Grid>
  );
};

const DataRow = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between" spacing={2}>
    <Typography variant="body2" sx={{ color: palette.muted }}>
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={600} sx={{ color: palette.ink }}>
      {value ?? "—"}
    </Typography>
  </Stack>
);

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

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
