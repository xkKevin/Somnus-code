//参数：g、矩阵、explicit/implicit列、表格起始位置（左上角）、单元格长度和宽度、按行还是按列添加颜色
//pos中含有表格左上角的横坐标和纵坐标
//insertPos表示插入行的位置
//keepPos表示保存行的位置
//deletePos表示删除列的位置
import {tableRender} from '@/assets/js/config/config'
export function drawTableForRow(g,matrix,pos,colWidth,colHeight,table_name,colFontSize = 1.5,cellFontSize = 1,rowColor = [],naRow = [],naCol = []) {
    let maxCharsPerCol = Math.floor(colWidth / colFontSize)
    let maxCharsPerCell = Math.floor(colWidth / cellFontSize)
    let colors = tableRender.colors
    g.append('text')
        .attr('x',pos[0])
        .attr('y',pos[1] - colHeight)
        .attr('dy',colHeight / 3 * 2)
        .attr('text-anchor', 'start')
        .text(table_name)
        .attr('fill','black')
        .attr('font-size',`${colFontSize}px`)
    for(let row = 0; row < matrix.length; row++){
        //dCol表示删除列时，output glyph中当前列需要左移的位置
        if(row === 0){
            for(let col = 0; col < matrix[0].length; col ++){
                g.append('rect')
                    .attr('width',colWidth)
                    .attr('height',colHeight)
                    .attr('fill',tableRender.firstRowColor)
                    .attr('opacity',tableRender.opacity)
                    .attr('stroke-width','1px')
                    .attr('stroke','black')
                    .attr('x',pos[0] + col * colWidth)
                    .attr('y',pos[1] + row * colHeight)

                // g.append('text')
                //     .attr('x',pos[0] + col * colWidth)
                //     .attr('y',pos[1] + row * colHeight)
                //     .attr('dx',colWidth / 2)
                //     .attr('dy',colHeight / 3 * 2)
                //     .attr('text-anchor', 'middle')
                //     .text(matrix[row][col].length > maxCharsPerCol ?
                //         matrix[row][col].slice(0,maxCharsPerCol) : matrix[row][col])
                //     .attr('fill','white')
                //     .attr('font-size',`${colFontSize}px`)
                if(matrix[row][col].length <= 5){
                    g.append('text')
                    .attr('x',pos[0] + col * colWidth)
                    .attr('y',pos[1] + row * colHeight)
                    .attr('dx',colWidth / 2)
                    .attr('dy',colHeight / 3 * 2)
                    .attr('text-anchor', 'middle')
                    .text(matrix[row][col])
                    .attr('fill','white')
                    .attr('font-size',`${colWidth / 4}px`)
                }else{
                    let textToShow = matrix[row][col].slice(0,4)
                    g.append('text')
                    .attr('x',pos[0] + col * colWidth)
                    .attr('y',pos[1] + row * colHeight)
                    .attr('dx',colWidth / 2)
                    .attr('dy',colHeight / 3 * 2)
                    .attr('text-anchor', 'middle')
                    .text(textToShow + '…')
                    .attr('fill','white')
                    .attr('font-size',`${colWidth / 4}px`)
                    .append("svg:title")
                    .text(matrix[row][col])
                }
            }
        }
        else{
            for(let col = 0; col < matrix[0].length; col ++){
                let color = rowColor.length == 0 ? colors[row - 1] : colors[rowColor[row - 1]]
                if(naRow.length !== 0){
                    if(naRow.indexOf(row) !== -1){
                        if(naCol[naRow.indexOf(row)] === col)
                        color = 'white'
                    }
                }
                g.append('rect')
                    .attr('width',colWidth)
                    .attr('height',colHeight)
                    .attr('fill',color)
                    .attr('stroke-width','1px')
                    .attr('stroke','black')
                    .attr('x',pos[0] + col * colWidth)
                    .attr('y',pos[1] + row * colHeight)
                    // .attr('opacity',0.8)
                // g.append('text')
                //     .attr('x',pos[0] + col * colWidth)
                //     .attr('y',pos[1] + row * colHeight)
                //     .attr('dx',colWidth / 2)
                //     .attr('dy',colHeight / 3 * 2)
                //     .attr('text-anchor', 'middle')
                //     .text(matrix[row][col].length > maxCharsPerCell ?
                //         matrix[row][col].slice(0,maxCharsPerCell) : matrix[row][col])
                //     .attr('fill','white')
                //     .attr('font-size',`${cellFontSize}px`)
                if(matrix[row][col].length <= 5){
                    g.append('text')
                    .attr('x',pos[0] + col * colWidth)
                    .attr('y',pos[1] + row * colHeight)
                    .attr('dx',colWidth / 2)
                    .attr('dy',colHeight / 3 * 2)
                    .attr('text-anchor', 'middle')
                    .text(matrix[row][col])
                    .attr('fill','white')
                    .attr('font-size',`${colWidth / 4}px`)
                }else{
                    let textToShow = matrix[row][col].slice(0,4)
                    let tempG = g.append('text')
                    .attr('x',pos[0] + col * colWidth)
                    .attr('y',pos[1] + row * colHeight)
                    .attr('dx',colWidth / 2)
                    .attr('dy',colHeight / 3 * 2)
                    .attr('text-anchor', 'middle')
                    .text(textToShow + '…')
                    .attr('fill','white')
                    .attr('font-size',`${colWidth / 4}px`)
                    .append("svg:title")
                    .text(matrix[row][col])
                }
            }
        }
    }
}