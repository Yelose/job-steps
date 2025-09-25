// src/app/shared/services/location-format-service.ts
import { Injectable } from '@angular/core';

export interface LocationDisplay {
  label: string;
  href?: string;
}

@Injectable({ providedIn: 'root' })
export class LocationFormatService {

  parse(input: string | null | undefined): LocationDisplay {
    const raw = (input ?? '').trim();
    if (!raw) return { label: '' };

    const url = this.tryParseUrl(raw);
    if (!url) return { label: raw }; // texto plano, sin enlace

    if (this.isGoogleMaps(url)) {
      const label = this.googleLabel(url) ?? 'Ver en Google Maps';
      return { label, href: url.toString() };
    }

    if (this.isOpenStreetMap(url)) {
      const label = this.osmLabel(url) ?? 'Ver en OpenStreetMap';
      return { label, href: url.toString() };
    }

    // Otras URLs: etiqueta neutral
    return { label: 'Abrir ubicación', href: url.toString() };
  }

  // ——— helpers ———

  // Sólo aceptamos: (a) http/https explícito; (b) dominios de mapas sin protocolo.
  private tryParseUrl(value: string): URL | null {
    const v = value.trim();
    const isExplicit = /^https?:\/\//i.test(v);
    const isKnownMap =
      /^(?:www\.)?(?:maps\.app\.goo\.gl|goo\.gl\/maps|(?:www\.)?google\.[\w.]+\/maps|openstreetmap\.org)/i.test(v);

    const candidate = isExplicit ? v : (isKnownMap ? `https://${v}` : null);
    if (!candidate) return null;

    try {
      const url = new URL(candidate);
      return (url.protocol === 'http:' || url.protocol === 'https:') ? url : null;
    } catch {
      return null;
    }
  }

  private isGoogleMaps(url: URL): boolean {
    const h = url.hostname.toLowerCase();
    return (
      h.endsWith('google.com') ||
      h.endsWith('google.es') ||
      h.endsWith('maps.app.goo.gl') ||
      h.endsWith('goo.gl')
    ) && url.pathname.toLowerCase().includes('/maps');
  }

  private isOpenStreetMap(url: URL): boolean {
    return url.hostname.toLowerCase().endsWith('openstreetmap.org');
  }

  private safeDecode(s: string): string {
    let out = s.replace(/\+/g, ' ');
    try { out = decodeURIComponent(out); } catch { }
    if (/%25/.test(out)) { // doble codificación (%25 = %)
      try { out = decodeURIComponent(out); } catch { }
    }
    return out.trim();
  }

  private googleLabel(url: URL): string | null {
    const p = url.pathname;

    // /maps/place/<label>/...
    const idx = p.toLowerCase().indexOf('/maps/place/');
    if (idx >= 0) {
      const seg = p.slice(idx + '/maps/place/'.length).split('/')[0] ?? '';
      const text = this.safeDecode(seg);
      if (text) return text;
    }

    // ?q=<label>
    const q = url.searchParams.get('q');
    if (q) {
      const text = this.safeDecode(q);
      if (text) return text;
    }

    // ?query=<label> (api=1)
    const query = url.searchParams.get('query');
    if (query) {
      const text = this.safeDecode(query);
      if (text) return text;
    }

    return null; // short-links sin nombre
  }

  private osmLabel(url: URL): string | null {
    const query = url.searchParams.get('query');
    if (query) {
      const text = this.safeDecode(query);
      if (text) return text;
    }
    return null;
  }
}
