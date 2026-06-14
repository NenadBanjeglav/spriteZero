import indexHtml from '../index.html?raw';

describe('share metadata', () => {
  function loadIndexDocument() {
    return new DOMParser().parseFromString(indexHtml, 'text/html');
  }

  function metaByName(document: Document, name: string) {
    return document.querySelector(`meta[name="${name}"]`)?.getAttribute('content');
  }

  function metaByProperty(document: Document, property: string) {
    return document.querySelector(`meta[property="${property}"]`)?.getAttribute('content');
  }

  it('defines Serbian SEO, Open Graph, and Twitter card metadata', () => {
    const document = loadIndexDocument();
    const ogImage = metaByProperty(document, 'og:image');

    expect(document.documentElement.lang).toBe('sr-Latn');
    expect(document.querySelector('title')?.textContent).toBe(
      'Sprite Zero u Srbiji | Javna kampanja za potražnju',
    );
    expect(metaByName(document, 'description')).toBe(
      'Dodaj glas da pokažemo gde ljudi u Srbiji traže Sprite Zero bez šećera. Javno se prikazuju samo ukupni i lokalni brojevi potražnje.',
    );

    expect(metaByProperty(document, 'og:locale')).toBe('sr_RS');
    expect(metaByProperty(document, 'og:type')).toBe('website');
    expect(metaByProperty(document, 'og:site_name')).toBe('Sprite Zero u Srbiji');
    expect(metaByProperty(document, 'og:title')).toBe('Sprite Zero u Srbiji');
    expect(metaByProperty(document, 'og:description')).toBe(
      metaByName(document, 'description'),
    );
    expect(ogImage).toBe('/og-empty-fridge-hero-generated-v1.png');
    expect(metaByProperty(document, 'og:image:alt')).toMatch(/Prazno mesto/i);
    expect(ogImage).not.toMatch(/coca|cola|logo|official/i);

    expect(metaByName(document, 'twitter:card')).toBe('summary_large_image');
    expect(metaByName(document, 'twitter:title')).toBe('Sprite Zero u Srbiji');
    expect(metaByName(document, 'twitter:description')).toBe(
      metaByName(document, 'description'),
    );
    expect(metaByName(document, 'twitter:image')).toBe(ogImage);
    expect(metaByName(document, 'twitter:image:alt')).toMatch(/Prazno mesto/i);
  });
});
