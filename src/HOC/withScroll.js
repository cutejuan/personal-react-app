import BScroll from 'better-scroll'
import React, {Component} from 'react'

export default (Com) => {
    class Myscroll extends Component {
        render(){
            const {propsRef, ...rest} = this.props
            return (
                <div className="scroll-wrap" style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                }} ref={(el)=>{this.wrapper = el}}>

                    <main className="scroll-content" style={{width: '100%'}}>
                        <Com  style={{width: '100%'}} ref={propsRef} {...rest} />
                    </main>

                    {
                        
                    }

                </div>
            )
        }

        componentDidMount(){

            let wrapper = this.wrapper;
            const scroll = new BScroll(wrapper, {
                tap: true,
                click: true,
                probeType: 1,
                scrollY: true,
                scrollX: false,
                probeType: 2
            })
        }

    }

    return React.forwardRef((props, ref)=>{
        return <Myscroll {...props} propsRef={ref} />
    })
} 