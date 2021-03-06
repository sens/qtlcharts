// Generated by CoffeeScript 1.7.1
var cichart;

cichart = function() {
  var axispos, chart, height, margin, nyticks, rectcolor, rotate_ylab, segcolor, segstrokewidth, segwidth, title, titlepos, vertsegcolor, width, xcatlabels, xlab, xscale, ylab, ylim, yscale, yticks;
  width = 400;
  height = 500;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = 20;
  xcatlabels = null;
  segwidth = null;
  ylim = null;
  nyticks = 5;
  yticks = null;
  rectcolor = d3.rgb(230, 230, 230);
  segcolor = "slateblue";
  segstrokewidth = "3";
  vertsegcolor = "slateblue";
  title = "";
  xlab = "Group";
  ylab = "Response";
  rotate_ylab = null;
  xscale = d3.scale.ordinal();
  yscale = d3.scale.linear();
  chart = function(selection) {
    return selection.each(function(data) {
      var categories, g, gEnter, high, low, means, segments, svg, tip, titlegrp, xaxis, xrange, yaxis, yrange, ys;
      means = data.means;
      low = data.low;
      high = data.high;
      categories = data.categories;
      if (means.length !== low.length) {
        throw "means.length != low.length";
      }
      if (means.length !== high.length) {
        throw "means.length != high.length";
      }
      if (means.length !== categories.length) {
        throw "means.length != categories.length";
      }
      xcatlabels = xcatlabels != null ? xcatlabels : categories;
      if (xcatlabels.length !== categories.length) {
        throw "xcatlabels.length != categories.length";
      }
      ylim = ylim != null ? ylim : [d3.min(low), d3.max(high)];
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", rectcolor).attr("stroke", "none");
      xrange = [margin.left + margin.inner, margin.left + width - margin.inner];
      xscale.domain(categories).rangePoints(xrange, 1);
      segwidth = segwidth != null ? segwidth : (xrange[1] - xrange[0]) / categories.length * 0.2;
      yrange = [margin.top + height - margin.inner, margin.top + margin.inner];
      yscale.domain(ylim).range(yrange);
      ys = d3.scale.linear().domain(ylim).range(yrange);
      yticks = yticks != null ? yticks : ys.ticks(nyticks);
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.selectAll("empty").data(categories).enter().append("line").attr("x1", function(d) {
        return xscale(d);
      }).attr("x2", function(d) {
        return xscale(d);
      }).attr("y1", margin.top).attr("y2", margin.top + height).attr("class", "x axis grid");
      xaxis.selectAll("empty").data(categories).enter().append("text").attr("x", function(d) {
        return xscale(d);
      }).attr("y", margin.top + height + axispos.xlabel).text(function(d, i) {
        return xcatlabels[i];
      });
      xaxis.append("text").attr("class", "title").attr("x", margin.left + width / 2).attr("y", margin.top + height + axispos.xtitle).text(xlab);
      rotate_ylab = rotate_ylab != null ? rotate_ylab : ylab.length > 1;
      yaxis = g.append("g").attr("class", "y axis");
      yaxis.selectAll("empty").data(yticks).enter().append("line").attr("y1", function(d) {
        return yscale(d);
      }).attr("y2", function(d) {
        return yscale(d);
      }).attr("x1", margin.left).attr("x2", margin.left + width).attr("class", "y axis grid");
      yaxis.selectAll("empty").data(yticks).enter().append("text").attr("y", function(d) {
        return yscale(d);
      }).attr("x", margin.left - axispos.ylabel).text(function(d) {
        return formatAxis(yticks)(d);
      });
      yaxis.append("text").attr("class", "title").attr("y", margin.top + height / 2).attr("x", margin.left - axispos.ytitle).text(ylab).attr("transform", rotate_ylab ? "rotate(270," + (margin.left - axispos.ytitle) + "," + (margin.top + height / 2) + ")" : "");
      tip = d3.tip().attr('class', 'd3-tip').html(function(d, i) {
        var f, index;
        index = i % means.length;
        f = formatAxis([low[index], means[index]], 1);
        return "" + (f(means[index])) + " (" + (f(low[index])) + " - " + (f(high[index])) + ")";
      }).direction('e').offset([0, 10]);
      svg.call(tip);
      segments = g.append("g").attr("id", "segments");
      segments.selectAll("empty").data(low).enter().append("line").attr("x1", function(d, i) {
        return xscale(categories[i]);
      }).attr("x2", function(d, i) {
        return xscale(categories[i]);
      }).attr("y1", function(d) {
        return yscale(d);
      }).attr("y2", function(d, i) {
        return yscale(high[i]);
      }).attr("fill", "none").attr("stroke", vertsegcolor).attr("stroke-width", segstrokewidth);
      segments.selectAll("empty").data(means.concat(low, high)).enter().append("line").attr("x1", function(d, i) {
        var x;
        x = xscale(categories[i % means.length]);
        if (i < means.length) {
          return x - segwidth / 2;
        }
        return x - segwidth / 3;
      }).attr("x2", function(d, i) {
        var x;
        x = xscale(categories[i % means.length]);
        if (i < means.length) {
          return x + segwidth / 2;
        }
        return x + segwidth / 3;
      }).attr("y1", function(d) {
        return yscale(d);
      }).attr("y2", function(d) {
        return yscale(d);
      }).attr("fill", "none").attr("stroke", segcolor).attr("stroke-width", segstrokewidth).on("mouseover.paneltip", tip.show).on("mouseout.paneltip", tip.hide);
      return g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.margin = function(value) {
    if (!arguments.length) {
      return margin;
    }
    margin = value;
    return chart;
  };
  chart.axispos = function(value) {
    if (!arguments.length) {
      return axispos;
    }
    axispos = value;
    return chart;
  };
  chart.titlepos = function(value) {
    if (!arguments.length) {
      return titlepos;
    }
    titlepos;
    return chart;
  };
  chart.xcatlabels = function(value) {
    if (!arguments.length) {
      return xcatlabels;
    }
    xcatlabels = value;
    return chart;
  };
  chart.ylim = function(value) {
    if (!arguments.length) {
      return ylim;
    }
    ylim = value;
    return chart;
  };
  chart.nyticks = function(value) {
    if (!arguments.length) {
      return nyticks;
    }
    nyticks = value;
    return chart;
  };
  chart.yticks = function(value) {
    if (!arguments.length) {
      return yticks;
    }
    yticks = value;
    return chart;
  };
  chart.rectcolor = function(value) {
    if (!arguments.length) {
      return rectcolor;
    }
    rectcolor = value;
    return chart;
  };
  chart.segcolor = function(value) {
    if (!arguments.length) {
      return segcolor;
    }
    segcolor = value;
    return chart;
  };
  chart.segstrokewidth = function(value) {
    if (!arguments.length) {
      return segstrokewidth;
    }
    segstrokewidth = value;
    return chart;
  };
  chart.segwidth = function(value) {
    if (!arguments.length) {
      return segwidth;
    }
    segwidth = value;
    return chart;
  };
  chart.vertsegcolor = function(value) {
    if (!arguments.length) {
      return vertsegcolor;
    }
    vertsegcolor = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.xlab = function(value) {
    if (!arguments.length) {
      return xlab;
    }
    xlab = value;
    return chart;
  };
  chart.ylab = function(value) {
    if (!arguments.length) {
      return ylab;
    }
    ylab = value;
    return chart;
  };
  chart.rotate_ylab = function(value) {
    if (!arguments.length) {
      return rotate_ylab;
    }
    rotate_ylab = value;
    return chart;
  };
  chart.yscale = function() {
    return yscale;
  };
  chart.xscale = function() {
    return xscale;
  };
  return chart;
};
