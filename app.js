const DEMO_PANORAMAS = {
  hallway: "assets/panoramas/adm-demo-hallway.jpg",
  living: "assets/panoramas/adm-demo-living-room.jpg",
  bedroom: "assets/panoramas/adm-demo-bedroom.jpg",
};

// Every scene already has the future before/after contract. The demo only supplies afterPanorama.
const scenes = {
  hallway: {
    title: "Hallway",
    code: "01 / HALL",
    caption: "Interior reference panorama · external demo data",
    beforePanorama: null,
    afterPanorama: DEMO_PANORAMAS.hallway,
    initial: { pitch: -2, yaw: 112, hfov: 96 },
    thumbnailPosition: "50% 52%",
    hotspots: [
      { pitch: -2, yaw: 112, type: "scene", text: "Living Room", sceneId: "living" },
      { pitch: -1, yaw: -115, type: "scene", text: "Bedroom", sceneId: "bedroom" },
    ],
  },
  living: {
    title: "Living Room",
    code: "02 / LIVING",
    caption: "Hotel room reference · external interior demo data",
    beforePanorama: null,
    afterPanorama: DEMO_PANORAMAS.living,
    initial: { pitch: -3, yaw: 72, hfov: 100 },
    thumbnailPosition: "30% 55%",
    hotspots: [
      { pitch: -1, yaw: -24, type: "scene", text: "Hallway", sceneId: "hallway" },
      { pitch: -2, yaw: 65, type: "scene", text: "Bedroom", sceneId: "bedroom" },
    ],
  },
  bedroom: {
    title: "Bedroom",
    code: "03 / BED",
    caption: "Dormitory room reference · external demo data",
    beforePanorama: null,
    afterPanorama: DEMO_PANORAMAS.bedroom,
    initial: { pitch: -4, yaw: -155, hfov: 98 },
    thumbnailPosition: "72% 48%",
    hotspots: [
      { pitch: -2, yaw: -155, type: "scene", text: "Hallway", sceneId: "hallway" },
      { pitch: -1, yaw: -74, type: "scene", text: "Living Room", sceneId: "living" },
    ],
  },
};

let activeSceneId = "hallway";
let viewer;

function panoramaFor(scene, mode = "after") {
  return mode === "before" ? scene.beforePanorama : scene.afterPanorama;
}

function sceneConfig(sceneId) {
  const scene = scenes[sceneId];
  return {
    title: scene.title,
    type: "equirectangular",
    panorama: panoramaFor(scene),
    pitch: scene.initial.pitch,
    yaw: scene.initial.yaw,
    hfov: scene.initial.hfov,
    autoLoad: true,
    showZoomCtrl: true,
    showFullscreenCtrl: true,
    hotSpots: scene.hotspots,
  };
}

function roomButton(sceneId, scene) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "room-button";
  button.dataset.scene = sceneId;
  button.innerHTML = `
    <img class="room-thumb" src="${scene.afterPanorama}" alt="" style="object-position:${scene.thumbnailPosition}" />
    <span><strong class="room-name">${scene.title}</strong><small class="room-meta">${scene.code}</small></span>
    <span class="room-arrow" aria-hidden="true">→</span>
  `;
  button.addEventListener("click", () => openScene(sceneId));
  return button;
}

function renderRooms() {
  const list = document.querySelector("#room-list");
  Object.entries(scenes).forEach(([sceneId, scene]) => list.appendChild(roomButton(sceneId, scene)));
}

function syncSceneUI(sceneId) {
  const scene = scenes[sceneId];
  document.querySelector("#scene-title").textContent = scene.title;
  document.querySelector("#scene-caption").textContent = scene.caption;
  document.querySelector("#scene-status").textContent = panoramaFor(scene) ? "After panorama" : "Panorama pending";
  document.querySelectorAll("[data-scene]").forEach((element) => {
    element.classList.toggle("is-active", element.dataset.scene === sceneId);
  });
}

function openScene(sceneId) {
  if (!scenes[sceneId]) return;
  activeSceneId = sceneId;
  viewer.loadScene(sceneId, ...Object.values(scenes[sceneId].initial));
  syncSceneUI(sceneId);
}

function initViewer() {
  const pannellumScenes = Object.fromEntries(Object.keys(scenes).map((sceneId) => [sceneId, sceneConfig(sceneId)]));
  viewer = pannellum.viewer("panorama", {
    default: {
      firstScene: activeSceneId,
      sceneFadeDuration: 700,
      autoLoad: true,
      showControls: true,
    },
    scenes: pannellumScenes,
  });
  viewer.on("scenechange", (sceneId) => {
    activeSceneId = sceneId;
    syncSceneUI(sceneId);
  });
  syncSceneUI(activeSceneId);
}

function initPlan() {
  document.querySelectorAll(".plan-node").forEach((node) => {
    node.addEventListener("click", () => openScene(node.dataset.scene));
  });
}

function initForm() {
  document.querySelector("#cta-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    document.querySelector("#form-message").textContent = "Demo request captured locally. Connect this form to the ADM intake flow next.";
    form.reset();
  });
}

renderRooms();
initPlan();
initForm();
initViewer();
