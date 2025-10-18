export default function ParallaxBg() {
  return (
    <section className="absolute inset-0">
      <div className="relative h-screen overflow-hidden ">
        {/* Background */}
        <div className="absolute inset-0 w-full h-[90dvh] -z-50 bg-[linear-gradient(to_bottom,rgba(11,17,13,1),rgba(0,0,0,0)),url('/bg-lands-2.jpg')] bg-cover bg-center bg-no-repeat" />
      </div>
    </section>
  );
}
