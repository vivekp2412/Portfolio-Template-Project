import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Card from "../Work-Card/Card";
import "../Carousel/style.css";
import { useAppSelector } from "../../../Hooks/Hooks";
//Owl Carousel Settings
const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  autoplay: false,
  navText: [
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-10 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-10 h-10">
<path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`,
  ],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
};
function Carousell() {
  const allWorks = useAppSelector((state) => state.work.allWorks);
  console.log(allWorks);

  const works = allWorks.map((work) => {
    return (
      <div>
        <Card
          workTitle={work.workTitle}
          workDesc={work.workDesc}
          image={work.image}
        />
      </div>
    );
  });
  console.log(works);

  return (
    <div>
      <OwlCarousel className="slider-items owl-carousel" {...options}>
        {works}
      </OwlCarousel>
    </div>
  );
}

export default Carousell;
