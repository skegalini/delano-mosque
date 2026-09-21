import {
  GeometricCrop,
  IslamicGeometricPattern,
} from '../design/TwelveFoldPattern'
import '../styles/border-design-lab.css'

const scaleVariants = [70, 90, 110, 130] as const
const offsetVariants = [-44, -28, -12] as const

export function BorderDesignLab() {
  return (
    <main className="border-lab">
      <header className="border-lab__header">
        <p className="border-lab__eyebrow">Temporary design lab</p>
        <h1>Twelve-fold geometric border study</h1>
        <p>
          One precomputed {'{12/5}'} tessellation, viewed as a complete field
          and through progressively thinner horizontal crops. Nothing on this
          page is connected to the production navbar or homepage divider.
        </p>
      </header>

      <section className="border-lab__section" aria-labelledby="source-title">
        <LabHeading
          description="The outlined square is one seamless 100 × 100 source tile. Dodecagrams extend beyond every edge and resolve through repetition."
          id="source-title"
          index="01"
          title="Large source-tile inspection"
        />
        <div className="border-lab__tile-wrap border-lab__surface--dark">
          <div className="border-lab__tile">
            <IslamicGeometricPattern tileSize={340} />
          </div>
        </div>
      </section>

      <section className="border-lab__section" aria-labelledby="field-title">
        <LabHeading
          description="The same tile repeats horizontally and vertically as a continuous field, exposing overlapping chords, rhombi, kites, and polygon junctions."
          id="field-title"
          index="02"
          title="Repeated geometric field"
        />
        <div className="border-lab__field border-lab__surface--dark">
          <IslamicGeometricPattern offsetX={11} offsetY={7} tileSize={110} />
        </div>
      </section>

      <section className="border-lab__section" aria-labelledby="crops-title">
        <LabHeading
          description="Each preview is a 24px-tall window. The geometry keeps its natural proportions; only tile scale and vertical position change."
          id="crops-title"
          index="03"
          title="Scale and crop-position matrix"
        />
        <div className="border-lab__matrix" role="list">
          {scaleVariants.flatMap((tileSize) =>
            offsetVariants.map((offsetY) => (
              <article
                className="border-lab__crop-card border-lab__surface--dark"
                key={`${tileSize}-${offsetY}`}
                role="listitem"
              >
                <div className="border-lab__crop-meta">
                  <strong>{tileSize}px source scale</strong>
                  <span>Y offset {offsetY}px</span>
                </div>
                <GeometricCrop
                  height={24}
                  offsetY={offsetY}
                  tileSize={tileSize}
                />
              </article>
            )),
          )}
        </div>
      </section>

      <section className="border-lab__section" aria-labelledby="themes-title">
        <LabHeading
          description="A denser 28px section slice and 13px navbar slice, both derived from the identical tessellation. The section study includes optional 1px architectural rails."
          id="themes-title"
          index="04"
          title="Proposed crops in both themes"
        />
        <div className="border-lab__themes">
          <ThemeStudy theme="dark" />
          <ThemeStudy theme="light" />
        </div>
      </section>

      <section className="border-lab__section" aria-labelledby="width-title">
        <LabHeading
          description="Fixed-scale geometry tiles seamlessly and the crop clips cleanly without creating horizontal page overflow."
          id="width-title"
          index="05"
          title="Responsive-width checks"
        />
        <div className="border-lab__width-stack">
          <WidthStudy label="375px mobile" width="375px" />
          <WidthStudy label="Full available width" width="100%" />
        </div>
      </section>
    </main>
  )
}

function LabHeading({
  description,
  id,
  index,
  title,
}: {
  description: string
  id: string
  index: string
  title: string
}) {
  return (
    <div className="border-lab__section-heading">
      <span>{index}</span>
      <div>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

function ThemeStudy({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <article className={`border-lab__theme border-lab__surface--${theme}`}>
      <h3>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</h3>
      <p>Section divider · 28px · 90px scale · Y −12 · rails on</p>
      <GeometricCrop height={28} offsetY={-12} rails tileSize={90} />
      <p>Navbar crop · 13px · 70px scale · Y −44</p>
      <GeometricCrop height={13} offsetY={-44} tileSize={70} />
    </article>
  )
}

function WidthStudy({ label, width }: { label: string; width: string }) {
  return (
    <article
      className="border-lab__width-study border-lab__surface--light"
      style={{ width }}
    >
      <span>{label}</span>
      <GeometricCrop height={28} offsetY={-12} rails tileSize={90} />
    </article>
  )
}
