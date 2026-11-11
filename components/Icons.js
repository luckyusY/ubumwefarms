import { GiRabbit, GiChicken, GiGoat, GiPig, GiCow, GiSheep, GiDuck, GiBarn } from 'react-icons/gi';

export {
  FaWhatsapp as WhatsAppIcon,
  FaPhone as PhoneIcon,
  FaLocationDot as PinIcon,
  FaStethoscope as HealthIcon,
  FaDna as BreedIcon,
  FaHandshake as HandshakeIcon,
  FaHeadset as AdviceIcon,
  FaLeaf as LeafIcon,
  FaCircleCheck as CheckIcon,
  FaStar as StarIcon,
  FaArrowRight as ArrowIcon,
} from 'react-icons/fa6';

const BY_CATEGORY = {
  rabbits: GiRabbit,
  chickens: GiChicken,
  goats: GiGoat,
  pigs: GiPig,
  cows: GiCow,
  sheep: GiSheep,
  ducks: GiDuck,
  other: GiBarn,
};

// One drawn icon per animal type, sized by the surrounding font-size.
export function CatIcon({ slug, ...props }) {
  const Icon = BY_CATEGORY[slug] || GiBarn;
  return <Icon aria-hidden {...props} />;
}
