// router@js
import { createRouter, createWebHistory } from 'vue-router';
import home from '@views/home.vue';
import Connexion from '@views/auth/Login.vue';
import A401_user from '@components/AccessDeniedUser.vue';

import Admin from '@views/admin/SuperAdmin.vue';
import InscriptionFront from '@components/RegisterFront.vue';
import InscriptionPersAsser from '@components/RegisterPersAsser.vue';
import InscriptionUser from '@components/RegisterUser.vue';
import InscriptionBank from '@components/RegisterBank.vue';
import InscriptionRp from '@views/admin/RegisterRp.vue';
import LicenceVendue from '@components/LicencesVendues.vue';
import RpInfos from '@views/admin/CompteRp-Infos.vue';
import FOInfos from '@views/admin/CompteFO-Infos.vue';
import BanqueInfos from '@views/admin/CompteBanque-Infos.vue';
import UserInfos from '@views/admin/CompteUser-Infos.vue';
import PAInfos from '@views/admin/ComptePA-Infos.vue';

import FO from '@components/FO/FO.vue';
import FOInfosForFO from '@components/FO/CompteFO-Infos{forFO}.vue';
import PAInfosForFO from '@components/FO/ComptePA-Infos{forFO}.vue';
import BanqueInfosForFO from '@components/FO/CompteBanque-Infos{forFO}.vue';
import UserInfosForFO from '@components/FO/CompteUser-Infos{forFO}.vue';
import LicenceVendueForFO from '@components/FO/LicencesVendues{forFO}.vue';

import PerssAsser from '@components/PA/PersAsser.vue';
import contratP from '@components/PA/acte.vue';
import Bank from '@components/InterfaceBanque.vue';

import User from '@components/User/UserInterface.vue';
import ConnexionUser from '@components/User/LoginUser.vue';

import Rp from '@components/RP/RP.vue';
import FOInfosForRp from '@components/RP/CompteFO-Infos{forRp}.vue';
import PAInfosForRp from '@components/RP/ComptePA-Infos{forRp}.vue';
import BanqueInfosForRp from '@components/RP/CompteBanque-Infos{forRp}.vue';
import UserInfosForRp from '@components/RP/CompteUser-Infos{forRp}.vue';
import LicenceVendueForRp from '@components/RP/LicencesVendues{forRp}.vue';
import listCivil from '@/components/list/listCivil.vue';
import listContrat from '@/components/list/listContrat.vue';
import ContratDetails from '@/components/list/ContratDetails';
import stats from '@components/stats/charts.vue';
import statAd from '@views/admin/statsAd.vue';
const routes = [
  { path: '/', 
  component: home },
  { path: '/connexion', component: Connexion },
  { path: '/authorization-denied-user', component: A401_user},
  
  { path: '/admin', component: statAd},
  { path: '/inscription-frontOffice', component: InscriptionFront},
  { path: '/inscription-persAsser', component: InscriptionPersAsser},
  { path: '/inscription-banque', component: InscriptionBank },
  { path: '/inscription-user', component: InscriptionUser },
  { path: '/inscription-representant-pays', component: InscriptionRp},
  { path: '/licences-vendues', component: LicenceVendue},
  { path: '/infos-FO', component: FOInfos},
  { path: '/infos-Rp', component: RpInfos},
  { path: '/infos-PA', component: PAInfos},
  { path: '/infos-Banque', component: BanqueInfos},
  { path: '/infos-User', component: UserInfos},
  
  { path: '/frontOffices', component: FO},
  { path: '/frontOffices/infos-FO', component: FOInfosForFO},
  { path: '/frontOffices/infos-PA', component: PAInfosForFO},
  { path: '/frontOffices/infos-Banque', component: BanqueInfosForFO},
  { path: '/frontOffices/infos-User', component: UserInfosForFO},
  { path: '/frontOffices/licences-vendues', component: LicenceVendueForFO},  
  
  { path: '/user', component: User},
  
  { path: '/banque', component: Bank},
  { path: '/acteP', component: contratP},
  
  { path: '/persAsser', component: PerssAsser},
  { path: '/connexion-user', component: ConnexionUser },
  
  { path: '/representant-pays', component: Rp},
  { path: '/representant-pays/infos-FO', component: FOInfosForRp},
  { path: '/representant-pays/infos-PA', component: PAInfosForRp},
  { path: '/representant-pays/infos-Banque', component: BanqueInfosForRp},
  { path: '/representant-pays/infos-User', component: UserInfosForRp},
  { path: '/representant-pays/licences-vendues', component: LicenceVendueForRp},
  {path:'/listCivil', component: listCivil  },
  {path:'/listContrat', component: listContrat  },
  {path:'/actes-de-prets/:id', component: ContratDetails },
  {path:'/stats', component:stats },
  {path:'/statsgr', component:statAd }



];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
