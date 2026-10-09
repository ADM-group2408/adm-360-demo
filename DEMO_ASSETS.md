# ADM 360 Demo Assets

This prototype uses open demo material only. `ADM Demo Residence` is fictional. The three room IDs use three different interior reference panoramas from Wikimedia Commons; they are not presented as one real apartment or as a before/after renovation pair.

## Panorama

| Source URL | Repository / website | License | Original filename | Local filename | Dimensions | Equirectangular 2:1 |
| --- | --- | --- | --- | --- | --- | --- |
| https://commons.wikimedia.org/wiki/File:Cerro_Pach%C3%B3n_Hotel_and_Restaurant_Entrance_360_Panorama_(2022_04_08_Pano360_Pachon_Hotel_Hall-CC).jpg | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cerro_Pach%C3%B3n_Hotel_and_Restaurant_Entrance_360_Panorama_(2022_04_08_Pano360_Pachon_Hotel_Hall-CC).jpg), source image by NOIRLab / NSF / AURA / P. Horálek | CC BY 4.0 | `Cerro Pachón Hotel and Restaurant Entrance 360 Panorama (2022 04 08 Pano360 Pachon Hotel Hall-CC).jpg` | `assets/panoramas/adm-demo-hallway.jpg` | 12,936 x 6,468 | Yes, exactly 2:1 |
| https://commons.wikimedia.org/wiki/File:Cerro_Tololo_Hotel_Interior_360_Panorama_(2022_04_08_Pano360_Tololo_Hotel_Room-CC).jpg | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cerro_Tololo_Hotel_Interior_360_Panorama_(2022_04_08_Pano360_Tololo_Hotel_Room-CC).jpg), source image by NOIRLab / NSF / AURA / P. Horálek | CC BY 4.0 | `Cerro Tololo Hotel Interior 360 Panorama (2022 04 08 Pano360 Tololo Hotel Room-CC).jpg` | `assets/panoramas/adm-demo-living-room.jpg` | 12,892 x 6,446 | Yes, exactly 2:1 |
| https://commons.wikimedia.org/wiki/File:Cerro_Pach%C3%B3n_Dormitory_Room_360_Panorama_(Pano360_Room_Pachon_Hotel1-CC).jpg | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cerro_Pach%C3%B3n_Dormitory_Room_360_Panorama_(Pano360_Room_Pachon_Hotel1-CC).jpg), source image by NOIRLab / NSF / AURA / P. Horálek | CC BY 4.0 | `Cerro Pachón Dormitory Room 360 Panorama (Pano360 Room Pachon Hotel1-CC).jpg` | `assets/panoramas/adm-demo-bedroom.jpg` | 13,012 x 6,506 | Yes, exactly 2:1 |

All three active files are full 2:1 equirectangular panoramas. The source locations are different, so the UI calls them reference interiors and does not claim they form one property.

## Downloaded but not used

The first pass downloaded Pannellum's outdoor example before the interior search was completed. It is retained in the local folder for traceability but is no longer referenced by `app.js`, `dist/app.js`, or the room gallery:

| Source URL | Original filename | Local filename | Dimensions | License | Status |
| --- | --- | --- | --- | --- | --- |
| https://raw.githubusercontent.com/mpetroff/pannellum/master/examples/examplepano.jpg | `examplepano.jpg` | `assets/panoramas/adm-demo-examplepano.jpg` | 4096 x 2048 | CC BY-SA 3.0 | Legacy asset, not used in the apartment-style demo |

## Viewer library

| Source URL | Local filename | License |
| --- | --- | --- |
| https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.js | `assets/vendor/pannellum.js` | MIT License, Pannellum |
| https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.css | `assets/vendor/pannellum.css` | MIT License, Pannellum |

Pannellum is used because its official tour example demonstrates an `equirectangular` scene plus `scene` hotspots. The local `app.js` follows that configuration model while keeping the ADM-specific UI outside the viewer.

## Replacement contract

When ADM's own files are available, replace the values in `DEMO_PANORAMAS` and the scene-level `afterPanorama` values in `app.js`. Add a real `beforePanorama` path to any scene and the existing `panoramaFor(scene, mode)` contract is ready for a future visible Before / After control. The current toggle is intentionally hidden because no verified before/after pair exists.
