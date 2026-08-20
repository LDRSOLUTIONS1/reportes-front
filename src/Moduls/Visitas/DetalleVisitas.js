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
  useTheme,
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CancelIcon from "@mui/icons-material/Cancel";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";

const DetalleVisitas = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { visita, GetVisita } = useContext(VisitasContext);
  const [lightbox, setLightbox] = useState(null);

  const palette = {
    ink: theme.palette.text.primary,
    muted: theme.palette.text.secondary,
    canvas: theme.palette.background.default,
    card: theme.palette.background.paper,
    hairline: theme.palette.divider,

    clienteDirecto: "#2E6BE0",
    distribuidor: "#7A5CDB",
    acuerdos: "#D98C2B",
    capacitacion: "#1E9E8B",
    evidencias: "#52606D",
    general: theme.palette.text.primary,
  };

  useEffect(() => {
    if (id) {
      GetVisita(id);
    }
  }, [id]);

  const tipo_visita = [
    { id: "presentacion_comercial", nombre: "Presentación comercial" },
    { id: "capacitacion_operativa", nombre: "Capacitación operativa" },
    { id: "capacitacion_producto", nombre: "Capacitación producto" },
    { id: "acompanamiento_comercial", nombre: "Acompañamiento comercial" },
    { id: "operativa", nombre: "Operativa" },
    { id: "capacitacion", nombre: "Capacitación" },
    { id: "otro", nombre: "Otro" },
  ];

  const getTipoVisitaNombre = (tipo) => {
    return tipo_visita.find((item) => item.id === tipo)?.nombre || tipo || "-";
  };

  const EVENTOS = [
    { id: "china", nombre: "China" },
    { id: "torneo_golf", nombre: "Torneo Golf" },
    { id: "f1", nombre: "F1" },
    { id: "expo_transporte", nombre: "Expo Transporte" },
    { id: "super_copa", nombre: "Super Copa" },
    { id: "cuernos_chuecos", nombre: "Cuernos Chuecos" },
  ];

  const getNombreEvento = (evento) => {
    return EVENTOS.find((item) => item.id === evento)?.nombre || evento || "-";
  };

  const financiamientos = [
    { id: "credito_casa", nombre: "Crédito Casa" },
    { id: "arrendamiento", nombre: "Arrendamiento" },
    { id: "contado", nombre: "Contado" },
    { id: "otro", nombre: "Otro" },
  ];

  const getFinanciamiento = (financiamiento) => {
    return (
      financiamientos.find((item) => item.id === financiamiento)?.nombre ||
      financiamiento ||
      "-"
    );
  };

  const tipos = [
    { id: "tecnica", nombre: "Tecnica" },
    { id: "comercial", nombre: "Comercial" },
    { id: "operativa", nombre: "Operativa" },
  ];

  const getTipo = (tipo) => {
    return tipos.find((item) => item.id === tipo)?.nombre || tipo || "-";
  };

  const TEMAS = [
    { id: "back_order", nombre: "Back Order" },
    { id: "bonos", nombre: "Bonos" },
    { id: "estado_cuenta", nombre: "Estado de cuenta" },
    { id: "estrategia_marketing", nombre: "Estrategía Marketing" },
    { id: "facturacion", nombre: "Facturación" },
    { id: "fuerza_ventas", nombre: "Fuerza de ventas" },
    { id: "inventario_facturado", nombre: "Inventario Facturado" },
    { id: "inventario_fisico", nombre: "Inventario Fisico" },
    { id: "notas_credito", nombre: "Notas de crédito" },
    { id: "pedidos_nuevos", nombre: "Pedidos nuevos" },
    { id: "plan_comercial", nombre: "Plan Comercial" },
    { id: "plan_piso", nombre: "Plan Piso" },
    { id: "posventa", nombre: "Posventa" },
    { id: "programacion_citas", nombre: "Programación de citas" },
    { id: "prospeccion_leads", nombre: "Prospección/ Leads" },
    { id: "retail", nombre: "Retail" },
  ];

  // Si ya tienes getEstadoEfectivo en un util compartido, usa ese en su lugar.
  const getEstadoChip = (acuerdo) => {
    if (acuerdo.status === 2) {
      return {
        label: "Completado",
        color: "success",
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
      };
    }
    if (acuerdo.status === 3) {
      return {
        label: "Cancelado",
        color: "default",
        icon: <CancelIcon sx={{ fontSize: 16 }} />,
      };
    }
    if (acuerdo.esta_vencido) {
      return {
        label: "Vencido",
        color: "error",
        icon: <ErrorOutlineIcon sx={{ fontSize: 16 }} />,
      };
    }
    return {
      label: "Pendiente",
      color: "warning",
      icon: <PriorityHighIcon sx={{ fontSize: 16 }} />,
    };
  };

  const getTema = (tema) => {
    return TEMAS.find((item) => item.id === tema)?.nombre || tema || "-";
  };

  if (!visita) {
    return (
      <Layout>
        <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: "auto" }}>
          <Skeleton variant="text" width={220} height={44} />
          <Skeleton variant="text" width={140} sx={{ mb: 3 }} />
          {[0, 1, 2].map((i) => (
            <Card
              key={i}
              variant="outlined"
              sx={{
                mb: 3,
                borderRadius: 3,
                borderColor: theme.palette.divider,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <CardContent>
                <Skeleton
                  variant="text"
                  width={180}
                  height={32}
                  sx={{ mb: 2 }}
                />
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
        <Card
          variant="outlined"
          sx={{
            mb: 3,
            borderRadius: 3,
            borderColor: palette.hairline,
            backgroundColor: "#FFFFFF",
            color: "#1C2530",
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
                    sx={{
                      color: "#1C2530",
                      lineHeight: 1.2,
                    }}
                  >
                    Detalle de visita
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748B",
                      fontWeight: 500,
                    }}
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
            <InfoItem
              label="Tipo de visita"
              value={getTipoVisitaNombre(visita.tipo_visita)}
            />
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
              <SectionCard
                title="Contactos"
                icon={<PersonIcon sx={{ fontSize: 20 }} />}
                accent={palette.clienteDirecto}
              >
                <Grid container spacing={2}>
                  {datosCliente.contacts.map((contacto) => (
                    <Grid item xs={12} md={6} key={contacto.id}>
                      <InnerCard>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="flex-start"
                        >
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
                            <Typography
                              fontWeight={700}
                              sx={{ color: palette.ink }}
                            >
                              {contacto.nombre}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: palette.muted }}
                            >
                              {contacto.puesto || "—"}
                            </Typography>
                            <Divider sx={{ my: 1.25 }} />
                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                <Box
                                  component="span"
                                  sx={{ color: palette.muted }}
                                >
                                  Email:{" "}
                                </Box>
                                {contacto.email || "—"}
                              </Typography>
                              <Typography variant="body2">
                                <Box
                                  component="span"
                                  sx={{ color: palette.muted }}
                                >
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
                        <Typography
                          fontWeight={700}
                          sx={{ color: palette.ink }}
                        >
                          {flota.marca}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: palette.muted }}
                        >
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
                        <Typography
                          variant="body2"
                          sx={{ color: palette.muted, mt: 0.75 }}
                        >
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
                          <Typography
                            fontWeight={700}
                            sx={{ color: palette.ink }}
                          >
                            {getNombreEvento(evento.nombre_evento)}
                          </Typography>
                          <Chip
                            size="small"
                            label={
                              evento.tipo === "asistio"
                                ? "Asistió"
                                : evento.tipo
                            }
                            sx={{
                              fontWeight: 700,
                              bgcolor:
                                evento.tipo === "asistio"
                                  ? `${palette.capacitacion}14`
                                  : `${palette.acuerdos}14`,

                              color:
                                evento.tipo === "asistio"
                                  ? palette.capacitacion
                                  : palette.acuerdos,
                            }}
                          />
                        </Stack>
                        {evento.otro_evento && (
                          <Typography
                            variant="body2"
                            sx={{ mt: 1, color: palette.muted }}
                          >
                            <strong style={{ color: palette.ink }}>
                              Otro:
                            </strong>{" "}
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
                    value={getFinanciamiento(
                      datosCliente.requirements.financiamiento,
                    )}
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
              <SectionCard
                title="Temas revisados"
                icon={<AssignmentIcon sx={{ fontSize: 20 }} />}
                accent={palette.distribuidor}
              >
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {datosDistribuidor.temas_revisados.map((tema, index) => (
                    <Chip
                      key={index}
                      label={getTema(tema)}
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
                  {datosDistribuidor.participantes.map(
                    (participante, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <InnerCard>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                          >
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
                            <Typography
                              fontWeight={600}
                              sx={{ color: palette.ink }}
                            >
                              {participante.nombre}
                            </Typography>
                          </Stack>
                        </InnerCard>
                      </Grid>
                    ),
                  )}
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
                        <Typography
                          fontWeight={700}
                          sx={{ color: palette.ink }}
                        >
                          {lead.cliente}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: palette.muted, mt: 0.25 }}
                        >
                          Modelo de interés: {lead.modelo_interes}
                        </Typography>

                        <Box sx={{ mt: 1.25 }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mb: 0.5 }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: palette.muted }}
                            >
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
                        <Typography
                          fontWeight={700}
                          sx={{ color: palette.ink }}
                        >
                          {indicador.modelo}
                        </Typography>
                        <Divider sx={{ my: 1.25 }} />
                        <Stack spacing={0.5}>
                          <DataRow label="BP 2025" value={indicador.bp_2025} />
                          <DataRow
                            label="Whole YTD"
                            value={indicador.whole_ytd}
                          />
                          <DataRow
                            label="Retail YTD"
                            value={indicador.retail_ytd}
                          />
                          <DataRow
                            label="Avance"
                            value={`${indicador.porcentaje_avance}%`}
                          />
                          <DataRow
                            label="Inventario"
                            value={indicador.inventario}
                          />
                          <DataRow
                            label="Back order"
                            value={indicador.back_order}
                          />
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
              {visita.followup_agreements.map((acuerdo) => {
                const dates = acuerdo.dates ?? [];
                const original =
                  dates.find((d) => d.numero_reprogramacion === 0)
                    ?.fecha_compromiso ?? acuerdo.fecha_compromiso;
                const vigente =
                  dates.find((d) => d.estado === 2) ?? dates[dates.length - 1];
                const fechaVigente =
                  vigente?.fecha_compromiso ?? acuerdo.fecha_compromiso;
                const estadoInfo = getEstadoChip(acuerdo);
                const reprogramaciones =
                  dates.length > 1 ? dates.length - 1 : 0;

                return (
                  <Grid item xs={12} key={acuerdo.id}>
                    <InnerCard
                      sx={{ borderLeft: `3px solid ${palette.acuerdos}` }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        spacing={1}
                      >
                        <Typography
                          fontWeight={700}
                          sx={{ color: palette.ink }}
                        >
                          {acuerdo.acuerdo}
                        </Typography>
                        <Chip
                          size="small"
                          label={estadoInfo.label}
                          color={estadoInfo.color}
                          icon={estadoInfo.icon}
                        />
                      </Stack>

                      <Divider sx={{ my: 1.25 }} />

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <DataRow
                            label="Responsable"
                            value={acuerdo.responsable}
                          />
                          <DataRow
                            label="Seguimiento"
                            value={acuerdo.seguimiento}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <DataRow
                            label="Fecha compromiso original"
                            value={formatDate(original)}
                          />
                          <DataRow
                            label="Fecha vigente"
                            value={formatDate(fechaVigente)}
                          />
                          {acuerdo.status === 2 && (
                            <DataRow
                              label="Completado el"
                              value={formatDate(acuerdo.completado_at)}
                            />
                          )}
                        </Grid>
                      </Grid>

                      {acuerdo.status === 3 && acuerdo.motivo_cancelacion && (
                        <Box
                          sx={{
                            mt: 1.5,
                            p: 1.5,
                            borderRadius: 1.5,
                            bgcolor: theme.palette.action.hover,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: palette.muted, fontWeight: 600 }}
                          >
                            Motivo de cancelación
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: palette.ink, mt: 0.25 }}
                          >
                            {acuerdo.motivo_cancelacion}
                          </Typography>
                        </Box>
                      )}

                      {reprogramaciones > 0 && (
                        <Box sx={{ mt: 1.5 }}>
                          <Stack
                            direction="row"
                            spacing={0.75}
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <EventRepeatIcon
                              sx={{ fontSize: 16, color: palette.muted }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: palette.muted, fontWeight: 600 }}
                            >
                              Historial de reprogramaciones ({reprogramaciones})
                            </Typography>
                          </Stack>

                          <Stack spacing={1}>
                            {dates
                              .slice()
                              .sort(
                                (a, b) =>
                                  a.numero_reprogramacion -
                                  b.numero_reprogramacion,
                              )
                              .map((d) => (
                                <Box
                                  key={d.id}
                                  sx={{
                                    pl: 1.5,
                                    borderLeft: `2px solid ${theme.palette.divider}`,
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    flexWrap="wrap"
                                  >
                                    <Typography
                                      variant="body2"
                                      fontWeight={600}
                                      sx={{ color: palette.ink }}
                                    >
                                      {d.numero_reprogramacion === 0
                                        ? "Fecha original"
                                        : `Reprogramación ${d.numero_reprogramacion}`}
                                      : {formatDate(d.fecha_compromiso)}
                                    </Typography>
                                    {d.estado === 2 && (
                                      <Chip
                                        label="Vigente"
                                        size="small"
                                        color="success"
                                        sx={{ height: 18, fontSize: 10 }}
                                      />
                                    )}
                                  </Stack>
                                  {d.motivo_reprogramacion && (
                                    <Typography
                                      variant="caption"
                                      sx={{ color: palette.muted }}
                                    >
                                      Motivo: {d.motivo_reprogramacion}
                                    </Typography>
                                  )}
                                  {d.user?.name && (
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      sx={{
                                        color: theme.palette.text.disabled,
                                      }}
                                    >
                                      {d.user.name} · {formatDate(d.created_at)}
                                    </Typography>
                                  )}
                                </Box>
                              ))}
                          </Stack>
                        </Box>
                      )}
                    </InnerCard>
                  </Grid>
                );
              })}
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
              <InfoItem
                label="Tipo"
                value={getTipo(visita.training_data.tipo)}
              />
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

const SectionCard = ({ title, icon, accent, children }) => {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 3,
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        transition: "box-shadow 180ms ease, border-color 180ms ease",

        "&:hover": {
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(0, 0, 0, 0.35)"
              : "0 4px 20px rgba(16, 24, 40, 0.06)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ mb: 2.5 }}
        >
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
            sx={{
              color: theme.palette.text.primary,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </Typography>
        </Stack>

        {children}
      </CardContent>
    </Card>
  );
};

const InnerCard = ({ children, sx = {} }) => {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: 2,
        borderColor: theme.palette.divider,
        bgcolor: theme.palette.background.default,
        p: 2,
        transition: "border-color 150ms ease, transform 150ms ease",
        "&:hover": {
          borderColor: theme.palette.text.disabled,
        },
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

const InfoItem = ({ label, value, xs = 12, md = 4 }) => {
  const theme = useTheme();

  return (
    <Grid item xs={xs} md={md}>
      <Typography
        variant="caption"
        display="block"
        sx={{
          mb: 0.5,
          color: theme.palette.text.secondary,
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
          color: value
            ? theme.palette.text.primary
            : theme.palette.text.disabled,
        }}
      >
        {value ?? "Sin dato"}
      </Typography>
    </Grid>
  );
};

const DataRow = ({ label, value }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
        {label}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ color: theme.palette.text.primary }}
      >
        {value ?? "—"}
      </Typography>
    </Stack>
  );
};

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
