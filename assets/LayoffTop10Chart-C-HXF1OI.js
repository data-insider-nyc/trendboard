import{R as x,j as a}from"./index-Bi1YoSo5.js";import{g as f,B as o,X as n,Y as l,f as c,R as p,C as d,T as h,L as m}from"./generateCategoricalChart-vgAMbfSD.js";var y=f({chartName:"BarChart",GraphicalChild:o,defaultTooltipEventType:"axis",validateTooltipEventTypes:["axis","item"],axisComponents:[{axisType:"xAxis",AxisComp:n},{axisType:"yAxis",AxisComp:l}],formatAxisMap:c});const C=({data:s})=>{const r=x.useMemo(()=>{const t={};return s.forEach(({company:e,laidOff:i})=>{t[e]=(t[e]||0)+i}),Object.entries(t).map(([e,i])=>({company:e,laidOff:i})).sort((e,i)=>i.laidOff-e.laidOff).slice(0,15)},[s]);return r.length===0?a.jsx("div",{children:"Loading chart..."}):a.jsxs("div",{style:{width:"100%",height:450},children:[a.jsx("h2",{className:"text-center text-xl mb-4",children:"Top Companies by Layoffs"}),a.jsx(p,{children:a.jsxs(y,{data:r,layout:"vertical",margin:{top:20,right:50,left:0,bottom:20},children:[a.jsx(d,{strokeDasharray:"3 3"}),a.jsx(n,{type:"number",tick:{fontSize:11},tickFormatter:t=>t.toLocaleString()}),a.jsx(l,{type:"category",tick:{fontSize:11},width:150,dataKey:"company"}),a.jsx(h,{}),a.jsx(o,{dataKey:"laidOff",fill:"#8884d8",children:a.jsx(m,{dataKey:"laidOff",position:"right",formatter:t=>t.toLocaleString(),style:{fontSize:11,fill:"#333"}})})]})})]})};export{C as default};
