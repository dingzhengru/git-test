<template>
  <div class="about">
    <h2 class="cpn-boxzero ui-h2-pageTitle">ABOUT US</h2>
    <div class="are-gameIntro">
      <div id="gameSport" class="blk-gameIntro">
        <img :src="imgSport" alt="" />
        <h2 class="ui-h2-gameIntroTitle">Sports</h2>
        <span class="txt-gameIntroDesc"
          >Offers a wide range of sporting event bets, including soccer, baseball, basketball and rugby, and other major
          sporting events in the world, offering the most accurate real-time event results and online betting services
          by a professional information management team. In addition to the diversification of events, but also in the
          various events in the design of many games are played, such as the ball and size, audience half, wave, the
          first goal / final goal.
        </span>
      </div>
    </div>
    <div id="gameGclub" class="blk-gameIntro">
      <img :src="imgGClub" alt="" />
      <h2 class="ui-h2-gameIntroTitle">G-Club</h2>
      <span class="txt-gameIntroDesc"
        >"GClub locates in the resort of Cambodia POIPET. It established legally and our online casino is franchised.
        Royal Online has stable financial background and safe information system. Members can fully trust that your
        rights will be guaranteed completely. GClub is a casino which is licensed and ruled by the local laws of
        Cambodia and managed by local administration. GClub is a live and open casino. Member can trust in any
        circumstances, because the financial system is supervised by the rules and ruled by public. The information
        system is the same level with the bank's. It is highly reliable and safe."
      </span>
    </div>
    <div id="gameRNG" class="blk-gameIntro">
      <img :src="imgRNG" alt="" />
      <h2 class="ui-h2-gameIntroTitle">RNG</h2>
      <span class="txt-gameIntroDesc"
        >Slot game ... provide more than 100 probability games, including slot machines, table games, arcade games,
        scratch music and other projects, in recent years more active development of multiplayer online game, wish you
        all the good luck, visual and acoustical effects Top-level entertainment, 4 level of gold pool and bonus game
        like a movie, unique style characters with current events, festivals and other topics, just want to give you a
        fun to enjoy the game experience
      </span>
    </div>
    <ul class="cpn-boxzero ul-gameIntro-toolbar">
      <li class="li-gameIntro-toolbar li-gameIntro-toolbar-01">
        <a v-scroll-to="'#gameSport'" class="lnk-gameIntro-toolbar"></a>
      </li>
      <li class="li-gameIntro-toolbar li-gameIntro-toolbar-02">
        <a v-scroll-to="'#gameGclub'" class="lnk-gameIntro-toolbar"></a>
      </li>
      <li class="li-gameIntro-toolbar li-gameIntro-toolbar-03">
        <a v-scroll-to="'#gameRNG'" class="lnk-gameIntro-toolbar"></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import imgSport from '@/assets/Y/01/01/imgs/game/gameIntro-01.jpg';
import imgGClub from '@/assets/Y/01/01/imgs/game/gameIntro-02.jpg';
import imgRNG from '@/assets/Y/01/01/imgs/game/gameIntro-03.jpg';

export default {
  name: 'About',
  computed: {
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  data() {
    return {
      imgSport: imgSport,
      imgGClub: imgGClub,
      imgRNG: imgRNG,
    };
  },
  mounted() {
    // * 根據版型引入 css
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${templatePath}/about.scss`);
  },
};
</script>

<style scoped>


.ui-h2-pageTitle {
  font-size: 40px;
  padding: 45px 0 10px 0;
  text-align: center;
}
.blk-gameIntro {
  width: 96%;
  margin: 0 auto;
}
.ui-h2-gameIntroTitle {
  text-align: left;
  font-size: 40px;
  margin: 20px 0 24px 15px;
}
.txt-gameIntroDesc {
  display: block;
  margin: 0 2%;
  text-align: left;
  font-size: 32px;
  line-height: 50px;
  padding-bottom: 80px;
  word-break: break-word;
}


.ul-gameIntro-toolbar {
  position: fixed;
  right: 10px;
  bottom: 145px;
}
.li-gameIntro-toolbar {
  width: 70px;
  height: 70px;
}
.lnk-gameIntro-toolbar {
  display: block;
  height: 70px;
}
.li-gameIntro-toolbar-01 {
  background-position: center top;
}
.li-gameIntro-toolbar-02 {
  background-position: center center;
}
.li-gameIntro-toolbar-03 {
  background-position: center bottom;
}

</style>
