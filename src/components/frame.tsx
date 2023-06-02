import { FC } from 'react'
import Nav from './nav'
import { AppState} from '../model/app'
import { ButtonDefaultExample } from './buttons'

const Frame: FC = () => {
   return(
    <>
    <div id="root">
    <Nav state={new AppState} itemShown={false} menu={function (): void {
           throw new Error('Function not implemented.')
       } } search={function (): void {
           throw new Error('Function not implemented.')
       } } markAllRead={function (): void {
           throw new Error('Function not implemented.')
       } } fetch={function (): void {
           throw new Error('Function not implemented.')
       } } logs={function (): void {
           throw new Error('Function not implemented.')
       } } views={function (): void {
           throw new Error('Function not implemented.')
       } } settings={function (): void {
           throw new Error('Function not implemented.')
       } } />
       <h1> Hello React FluentUI v8</h1>
       <ButtonDefaultExample />
       </div>
       </>
   ) 
}
export default Frame