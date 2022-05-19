import React from 'react'




const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ManageUsers = React.lazy(() => import('./views/ManageUsers/ManageUsers'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const FrontEndDataPlatform = React.lazy(() => import('./views/Database/FrontEndDataPlatform'))
const AddDataMainMenu = React.lazy(() => import('./views/Database/add Data/AddDataMainMenu'))
const AddDataFirstCategory = React.lazy(() => import('./views/Database/add Data/AddDataFirstCategory'))
const AddDataSecondCategory = React.lazy(() => import('./views/Database/add Data/AddDataSecondCategory'))
const AddFinal = React.lazy(() => import('./views/Database/add Data/AddFinal'))
//Edit data
const EditDataMainMenu  = React.lazy(() => import('./views/Database/EditDatabase/EditDataMainMenu'))
const EditSecond  = React.lazy(() => import('./views/Database/EditDatabase/EditSecond'))
const EditFirst  = React.lazy(() => import('./views/Database/EditDatabase/EditFirst'))
const EditFinal = React.lazy(() => import('./views/Database/EditDatabase/EditFinal'))

//Layout
const UnangSabak = React.lazy(() => import('./views/Database/UnangSabak'))
const SecondCategory = React.lazy(() => import('./views/Database/SecondCategory'))
const FinalCategory = React.lazy(() => import('./views/Database/FinalCategory'))
const DatadetailsView = React.lazy(() => import('./views/Database/DatadetailsView'))

//News
const FrontNews = React.lazy(() => import('./views/NewsData/FrontNews.js'))
const PreviewNews = React.lazy(() => import('./views/NewsData/ViewDetails.js'))
const LaborNews = React.lazy(() => import('./views/NewsData/LaborNews.js'))
const ROTCNews = React.lazy(() => import('./views/NewsData/RotcNews.js'))

const EditNews = React.lazy(() => import('./views/NewsData/EditNews.js'))
const AddNews = React.lazy(() => import('./views/NewsData/addDataNews.js'))
//Training
const Training = React.lazy(() => import('./views/TrainingData/BasicTraining/Training.js'))
const TrainingDetails = React.lazy(() => import('./views/TrainingData/BasicTraining/TrainingDetails.js'))
const AddTraining = React.lazy(() => import('./views/TrainingData/AddDataTraining.js'))
const AddSecondTraining = React.lazy(() => import('./views/TrainingData/AddTrainSecond.js'))
const SecondLayerTraining = React.lazy(() => import('./views/TrainingData/BasicTraining/SecondLayerTraining.js'))
const EditTraining = React.lazy(() => import('./views/TrainingData/BasicTraining/EditTrain2.js'))
const EditSecTraining = React.lazy(() => import('./views/TrainingData/BasicTraining/EditSecTrain.js'))
// const secongTraining 
const AdvanceTraining = React.lazy(() => import('./views/TrainingData/AdvanceTraining/AdvanceTraining.js'))
//Paper
const Comics = React.lazy(() => import('./views/Bulletin/Comics.js'))
const Bulletin = React.lazy(() => import('./views/Bulletin/Bulletin/BulletinPaper.js'))
const AddBulletin = React.lazy(() => import('./views/Bulletin/add Data/AddBulletin.js'))



// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', component: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress', name: 'Progress', component: Progress },
  { path: '/base/spinners', name: 'Spinners', component: Spinners },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/forms', name: 'Forms', component: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', component: FormControl },
  { path: '/forms/select', name: 'Select', component: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', component: ChecksRadios },
  { path: '/forms/range', name: 'Range', component: Range },
  { path: '/forms/input-group', name: 'Input Group', component: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', component: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', component: Layout },
  { path: '/forms/validation', name: 'Validation', component: Validation },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toasts', name: 'Toasts', component: Toasts },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  //new
  { path: '/manageUsers', name: 'ManageUsers', component: ManageUsers },
  { path: '/addDataMainMenu', name: 'addDataMainMenu', component: AddDataMainMenu },
  { path: '/frontEndDataPlatform', name: 'FrontEndDataPlatform', component: FrontEndDataPlatform },
  { path: '/addFirst', name: 'AddData First', component: AddDataFirstCategory },
  { path: '/addSecond', name: 'AddData Main Menu', component: AddDataSecondCategory },
  { path: '/addFinal', name: 'AddData Main Menu', component: AddFinal },
  //Edit Data
  { path: '/EditDataMainMenu', name: 'Edit Main Menu', component: EditDataMainMenu },
  { path: '/EditFirst', name: 'Edit First', component: EditFirst },
  { path: '/EditSecond', name: 'Edit Second', component: EditSecond },
  { path: '/EditFinal', name: 'Edit Final', component: EditFinal },

  //layout
  { path: '/unangsabak', name: 'First Category', component: UnangSabak },
  { path: '/secondCategory', name: 'Second Category', component: SecondCategory },
  { path: '/finalCategory', name: 'Final Category', component: FinalCategory },
  { path: '/dataDetails', name: 'Data Details', component: DatadetailsView },

  //news
  {path: '/newsHome', name: 'News', component: FrontNews },
  { path: '/previewNews', name: 'Preview News', component: PreviewNews },
  { path: '/addNews', name: 'Add New News', component: AddNews },
  { path: '/editNews', name: 'Edit News', component: EditNews },

  //OtherNews
  {path: '/laborNews', name: 'Labor News', component: LaborNews },
  {path: '/rotcNews', name: 'ROTC News', component: ROTCNews },
  

  //Training
  {path: '/trainingHome', name: 'Training', component: Training },
  {path: '//secondLayerTraining', name: 'Training', component: SecondLayerTraining },
  {path: '/secondLayerTraining', name: 'Training', component: SecondLayerTraining },
  {path: '/trainingDetails', name: 'Training Details', component: TrainingDetails },
  {path: '/trainingAdvance', name: 'Advance Training', component: AdvanceTraining },

  {path: '/addTraining', name: 'Add Training', component: AddTraining },
  {path: '/addSecondTraining', name: 'Add Training', component: AddSecondTraining },
  {path: '/editTraining', name: 'Edit Training', component: EditTraining },
  {path: '/editSecTraining', name: 'Edit Training', component: EditSecTraining },
  

  //Paper
  {path: '/bulletin', name: 'Bulletin', component: Bulletin },
  {path: '/addBulletin', name: 'AddBulletin', component: AddBulletin },
  {path: '/comics', name: 'Paper', component: Comics },

]

export default routes
