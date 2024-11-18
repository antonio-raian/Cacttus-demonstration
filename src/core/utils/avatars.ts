type AvatarProps = {
  variant: "notionists" | "micah" | "lorelei" | "big-smile";
  seed?: string;
};

const getAvatar = ({ variant, seed }: AvatarProps) => {
  const x: Record<string, string> = {
    notionists: `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&radius=50&backgroundType[]&backgroundRotation[]&beardProbability=20&brows=variant01,variant02,variant03,variant04,variant05,variant07,variant08,variant09,variant10,variant11,variant12&gesture=hand,handPhone,waveLongArm&lips=variant01,variant02,variant03,variant04,variant10,variant12,variant13,variant14,variant15,variant17,variant21,variant22,variant23,variant25,variant30`,
    micah: `https://api.dicebear.com/9.x/micah/svg?seed=${seed}&radius=50&backgroundType[]&backgroundRotation[]&ears=attached&eyebrows=eyelashesUp,up&facialHair[]&facialHairColor[]&mouth=laughing,pucker,smile,smirk`,
    lorelei: `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&radius=50&backgroundType=gradientLinear&backgroundRotation=0,30,60,90,120,150,180,210,240,270,300,330,360&beardProbability=10&eyes=variant01,variant02,variant04,variant06,variant07,variant08,variant09,variant10,variant11,variant12,variant15,variant17,variant18,variant19,variant20,variant21,variant22,variant23,variant24&mouth=happy01,happy02,happy03,happy04,happy05,happy06,happy07,happy08,happy10,happy11,happy13,happy14,happy16,happy17,happy18&backgroundColor=ffd5dc,d1d4f9,c0aede`,
    "big-smile": `https://api.dicebear.com/9.x/big-smile/svg?seed=${seed}&radius=50&backgroundType=solid,gradientLinear&backgroundRotation=0,10,30,20,40,50,60,80,70,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360&accessories=catEars,clownNose,faceMask,glasses,sleepMask,sunglasses,mustache,sailormoonCrown&mouth=awkwardSmile,braces,gapSmile,openedSmile,teethSmile,unimpressed&backgroundColor=c0aede,d1d4f9,ffd5dc`,
  };
  return x[variant];
};

export default getAvatar;

export const getAvatarList = (
  variant: AvatarProps["variant"],
  count: number = 20
) => {
  return Array.from({ length: count }).map((_, i) =>
    getAvatar({ variant, seed: i.toString() })
  );
};
