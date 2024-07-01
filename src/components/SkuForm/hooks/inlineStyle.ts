import CssRender from 'css-render';


const { c } = CssRender();
export const useContainerStyle = () => {
  const inlineStyle = c('.sku-navie-form', {
    padding: '12px',
    margin: '12px'
  }, [
      c('.sku-structure-container', {
        marginTop: '20px'
      })
     ])
  return [inlineStyle.mount.bind(inlineStyle), inlineStyle.unmount.bind(inlineStyle)]   
}