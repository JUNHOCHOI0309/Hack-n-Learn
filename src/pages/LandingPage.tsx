import ASCIIText from '@/components/ASCIIText';
import PixelBlast from '@/components/PixelBlast';

export default function LandingPage() {
  return (
    <>
      <div
        style={{ width: '100%', height: '600px', position: 'relative' }}
        className="bg-black"
      >
        <PixelBlast
          pixelSize={6}
          color="#B19EEF"
          patternScale={2}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
        <ASCIIText text="hello_world" enableWaves={true} asciiFontSize={8} />
      </div>
    </>
  );
}
