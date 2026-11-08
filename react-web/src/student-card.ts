// Draws the "Kartu Siswa" as an ID-card sized PNG (85.6 x 54 mm at ~300 dpi) and downloads it.

export interface StudentCardData {
  applicationId: number;
  fullname: string;
  program: string;
  nisn?: string;
  birthPlace?: string;
  birthDate?: string | Date;
  photoUrl?: string;
}

const W = 1012;
const H = 638;
const NAVY = "rgb(0, 31, 77)";
const SKY = "rgb(43, 172, 226)";
const GREEN = "rgb(0, 122, 51)";
const MUTED = "rgb(90, 110, 130)";
const LIGHT = "rgb(242, 247, 253)";
const FONT = '"Open Sans", sans-serif';

function loadImage(src: string, crossOrigin: boolean): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    // Uploads live on the API host; loading them with CORS keeps the canvas exportable
    if (crossOrigin) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    // e.g. a PDF upload, or storage that doesn't send CORS headers
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function formatDate(value: string | Date): string {
  const ymd = typeof value === "string" ? value.match(/^(\d{4})-(\d{2})-(\d{2})/) : null;
  // A bare YYYY-MM-DD is a calendar date: build it locally so the timezone can't shift the day
  const date = ymd
    ? new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]))
    : new Date(value);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const sw = w / scale;
  const sh = h / scale;
  ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, x, y, w, h);
}

function drawContain(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

// Shrinks the font down to minSize, then truncates with an ellipsis
function drawFitted(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  weight: number,
  size: number,
  minSize: number
) {
  let s = size;
  ctx.font = `${weight} ${s}px ${FONT}`;
  while (ctx.measureText(text).width > maxWidth && s > minSize) {
    s -= 1;
    ctx.font = `${weight} ${s}px ${FONT}`;
  }
  let t = text;
  while (ctx.measureText(t).width > maxWidth && t.length > 1) {
    t = t.slice(0, -2) + "…";
  }
  ctx.fillText(t, x, y);
}

function drawField(ctx: CanvasRenderingContext2D, label: string, value: string, x: number, y: number, maxWidth: number) {
  ctx.fillStyle = MUTED;
  ctx.font = `700 15px ${FONT}`;
  ctx.fillText(label, x, y);
  ctx.fillStyle = NAVY;
  drawFitted(ctx, value, x, y + 36, maxWidth, 700, 26, 18);
}

export async function downloadStudentCard(data: StudentCardData): Promise<void> {
  await Promise.all([600, 700, 800].map((w) => document.fonts.load(`${w} 24px "Open Sans"`)));
  const [logo, photo] = await Promise.all([
    loadImage("/logoBudiman.png", false),
    data.photoUrl ? loadImage(data.photoUrl, true) : Promise.resolve(null),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Browser tidak mendukung pembuatan gambar kartu");

  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 36);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  // Header
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, W, 150);
  ctx.fillStyle = SKY;
  ctx.fillRect(0, 150, W, 8);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(40, 27, 96, 96, 20);
  ctx.fill();
  if (logo) drawContain(ctx, logo, 48, 35, 80, 80);
  ctx.fillStyle = SKY;
  ctx.font = `700 18px ${FONT}`;
  ctx.fillText("YAYASAN", 160, 60);
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 34px ${FONT}`;
  ctx.fillText("BUDIMAN DRESTANTA", 160, 99);
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = `600 17px ${FONT}`;
  ctx.fillText("Pusat Kegiatan Belajar Masyarakat", 160, 127);
  ctx.textAlign = "right";
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 30px ${FONT}`;
  ctx.fillText("KARTU SISWA", W - 44, 88);
  ctx.textAlign = "left";

  // Photo (3:4), or the student's initials when the upload isn't a usable image
  const px = 44;
  const py = 190;
  const pw = 240;
  const ph = 320;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(px, py, pw, ph, 24);
  ctx.clip();
  ctx.fillStyle = LIGHT;
  ctx.fillRect(px, py, pw, ph);
  if (photo) {
    drawCover(ctx, photo, px, py, pw, ph);
  } else {
    const initials =
      data.fullname
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "?";
    ctx.fillStyle = SKY;
    ctx.font = `800 96px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, px + pw / 2, py + ph / 2);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(0, 31, 77, 0.15)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(px, py, pw, ph, 24);
  ctx.stroke();

  // Details
  const fx = 320;
  const fw = W - fx - 44;
  const colW = fw / 2 - 16;
  ctx.fillStyle = MUTED;
  ctx.font = `700 15px ${FONT}`;
  ctx.fillText("NAMA LENGKAP", fx, 214);
  ctx.fillStyle = NAVY;
  drawFitted(ctx, data.fullname, fx, 262, fw, 800, 44, 28);
  drawField(ctx, "PROGRAM", data.program, fx, 310, fw);
  const birth =
    [data.birthPlace, data.birthDate ? formatDate(data.birthDate) : ""].filter(Boolean).join(", ") || "-";
  drawField(ctx, "TEMPAT, TANGGAL LAHIR", birth, fx, 386, fw);
  drawField(ctx, "NISN", data.nisn || "-", fx, 462, colW);
  drawField(ctx, "NO. PENDAFTARAN", `#${data.applicationId}`, fx + fw / 2 + 16, 462, colW);

  // Footer
  ctx.fillStyle = GREEN;
  ctx.fillRect(0, H - 80, W, 80);
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 24px ${FONT}`;
  ctx.fillText("SISWA AKTIF", 44, H - 31);
  ctx.textAlign = "right";
  ctx.font = `600 18px ${FONT}`;
  ctx.fillText(`Diterbitkan ${formatDate(new Date())}`, W - 44, H - 33);
  ctx.textAlign = "left";

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Gagal membuat gambar kartu");
  const slug =
    data.fullname.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "siswa";
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `kartu-siswa-${slug}-${data.applicationId}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
