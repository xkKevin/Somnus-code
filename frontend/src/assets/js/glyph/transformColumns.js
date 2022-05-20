import * as d3 from 'd3'
import { drawHighLightCol } from "../utils/common/highLightCol"
import { drawLine } from "../utils/common/dashedLine"
import { drawIcon } from "../utils/common/icon"
import { drawOperationName } from "../utils/common/operationName";
import { drawTableForColumn } from "../utils/common/createTableForColumn";
import { fontSize, svgSize, showOperation } from "../config/config";
import { drawPcentBar } from "../utils/common/pcentBar"

function transform_columns_replace_na(m1, m2, rule, t1_name, t2_name, inExpOrImp, naPos = [], name, showTableName, pos, xPercents, yPercents) {
    if (!showTableName) {
        t1_name = ''
        t2_name = ''
    }

    let width = svgSize.width
    let height = svgSize.height
    let colWidth = width / (m2[0].length * 2 + 1)
    let colHeight = showOperation ? height / (m1.length + 3) : height / (m1.length + 2.5)
    let colFontSize = fontSize.colFontSize
    let cellFontSize = fontSize.cellFontSize

    const g = d3.select(`#mainsvg`).append('g')
        .attr('transform', `translate(${pos[0]},${pos[1]})`)
        .attr("id", `glyph${name}`)

    g.append('rect')
        .attr('x', -10)
        .attr('y', 0)
        .attr('width', parseInt(width) + 20)
        .attr('height', parseInt(height))
        .attr('stroke', 'gray')
        .attr('fill', 'transparent')
        .attr('class', `glyph_${name}`)

    g.append("path")
        .attr("d", `M${parseInt(width) / 2 - 4},${parseInt(height)} L${parseInt(width) / 2 + 4},${parseInt(height)}`)
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', "1px")
        // .attr('class',`glyph_${name}`)

    g.append("path")
        .attr("d", `M${parseInt(width) / 2 - 4},${parseInt(height)} L${parseInt(width) / 2},${parseInt(height) + 4} L${parseInt(width) / 2 + 4},${parseInt(height)}`)
        // .attr('d',"M0,0 L8,4 L0,8 L4,4 L0,0")
        .attr('fill', 'white')
        .attr('stroke', 'gray')
        .attr('stroke-width', "1px")
        .style("stroke-linecap", "round")
        .attr('class', `glyph_${name}`)

    drawTableForColumn(g, m1, [0, colHeight], colWidth, colHeight, t1_name, colFontSize, cellFontSize, [], naPos, inExpOrImp)
    drawPcentBar(g, [0, colHeight], m1[0].length * colWidth, m1.length * colHeight, colHeight, xPercents[0], yPercents[0])

    let arrowUrl = require('../../images/arrow.svg')
    drawIcon(g, [(m1[0].length + 0.1) * colWidth, (1 + m1.length / 2) * colHeight - colHeight / 2], 0.8 * colWidth, colHeight, arrowUrl)

    drawTableForColumn(g, m2, [(m1[0].length + 1) * colWidth, colHeight], colWidth, colHeight, t2_name, colFontSize, cellFontSize)
    drawPcentBar(g, [(m1[0].length + 1) * colWidth, colHeight], m2[0].length * colWidth, m2.length * colHeight, colHeight, xPercents[1], yPercents[1])

    let inColLenAndMid = drawHighLightCol(g, m1, inExpOrImp, [0, colHeight], colWidth, colHeight)
    let yOfLine = (m1.length + 2) * colHeight
        //画两个表之间的连线
    if (inColLenAndMid.len !== 0) {
        let outColLenAndMid = drawHighLightCol(g, m2, inExpOrImp, [(m2[0].length + 1) * colWidth, colHeight], colWidth, colHeight)
        yOfLine = inColLenAndMid.len === 1 ? (m1.length + 2) * colHeight : (m1.length + 3) * colHeight
        drawLine(g, [inColLenAndMid.midPoint, yOfLine], [outColLenAndMid.midPoint, yOfLine], true)
        if (inColLenAndMid.len !== 1) {
            drawLine(g, [outColLenAndMid.midPoint, yOfLine], [outColLenAndMid.midPoint, yOfLine - colHeight], true)
        }
    }
    if (showOperation) drawOperationName(g, [width / 2, yOfLine], rule, '1.2em', colFontSize)
}

function transform_columns_mutate(m1, m2, rule, t1_name, t2_name, inExpOrImp, outExpOrImp, name, showTableName, pos, xPercents, yPercents) {
    if (!showTableName) {
        t1_name = ''
        t2_name = ''
    }
    console.log(m1, m2, rule, t1_name, t2_name, inExpOrImp, outExpOrImp, name, showTableName, pos, xPercents, yPercents);
    let width = svgSize.width
    let height = svgSize.height
    let colWidth = width / (m2[0].length * 2 + 1)

    let colHeight = showOperation ? height / (m1.length + 3) : height / (m1.length + 2.5)
    let colFontSize = fontSize.colFontSize
    let cellFontSize = fontSize.cellFontSize

    const g = d3.select(`#mainsvg`).append('g')
        .attr('transform', `translate(${pos[0]},${pos[1]})`)
        .attr("id", `glyph${name}`)
    g.append('rect')
        .attr('x', -10)
        .attr('y', 0)
        .attr('width', parseInt(width) + 20)
        .attr('height', parseInt(height))
        .attr('stroke', 'gray')
        .attr('fill', 'transparent')
        .attr('class', `glyph_${name}`)
    g.append("path")
        .attr("d", `M${parseInt(width) / 2 - 4},${parseInt(height)} L${parseInt(width) / 2 + 4},${parseInt(height)}`)
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', "1px")
        // .attr('class',`glyph_${name}`)
    g.append("path")
        .attr("d", `M${parseInt(width) / 2 - 4},${parseInt(height)} L${parseInt(width) / 2},${parseInt(height) + 4} L${parseInt(width) / 2 + 4},${parseInt(height)}`)
        // .attr('d',"M0,0 L8,4 L0,8 L4,4 L0,0")
        .attr('fill', 'white')
        .attr('stroke', 'gray')
        .attr('stroke-width', "1px")
        .style("stroke-linecap", "round")
        .attr('class', `glyph_${name}`)
    drawTableForColumn(g, m1, [0, colHeight], colWidth, colHeight, t1_name, colFontSize, cellFontSize)
    drawPcentBar(g, [0, colHeight], m1[0].length * colWidth, m1.length * colHeight, colHeight, xPercents[0], yPercents[0])
        // 添加加号和箭头
    let arrowUrl = require('../../images/arrow.svg')
    drawIcon(g, [(m1[0].length + 0.2) * colWidth, (1 + m1.length / 2) * colHeight - colHeight / 2], 0.8 * colWidth, colHeight, arrowUrl)

    drawTableForColumn(g, m2, [(m1[0].length + 1) * colWidth, colHeight], colWidth, colHeight, t2_name, colFontSize, cellFontSize)
    drawPcentBar(g, [(m1[0].length + 1) * colWidth, colHeight], m2[0].length * colWidth, m2.length * colHeight, colHeight, xPercents[1], yPercents[1])


    let inColLenAndMid = drawHighLightCol(g, m1, inExpOrImp, [0, colHeight], colWidth, colHeight)
    console.log("transform", inColLenAndMid, m1, inExpOrImp, [0, colHeight], colWidth, colHeight);
    let yOfLine = (m1.length + 2) * colHeight
        //画两个表之间的连线
    if (inColLenAndMid.len != 0) {
        let outColLenAndMid = drawHighLightCol(g, m2, outExpOrImp, [(m2[0].length + 1) * colWidth, colHeight], colWidth, colHeight)
        yOfLine = inColLenAndMid.len == 1 ? (m1.length + 2) * colHeight : (m1.length + 2) * colHeight
        drawLine(g, [inColLenAndMid.midPoint, yOfLine], [outColLenAndMid.midPoint, yOfLine], true)
        if (inColLenAndMid.len != 1) {
            drawLine(g, [outColLenAndMid.midPoint, yOfLine], [outColLenAndMid.midPoint, yOfLine - colHeight], true)
        }
    }
    if (showOperation) drawOperationName(g, [width / 2, yOfLine], `${rule}`, '1.2em', colFontSize)
}

export { transform_columns_mutate, transform_columns_replace_na }