import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { Column } from '@ant-design/charts';
import { currentUser as queryCurrentUser } from '@/services/api';
import { queryProfile } from '@/pages/profile/service';
import { Pie } from '@ant-design/plots';
//todo "the value is 0"
const Page: React.FC = () => {
  const [locationData, setLocationData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
        ),
        1,
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await queryCurrentUser();
        const belongTo = response1.data.belongto;
        const response2 = await queryProfile({ belongto: belongTo });
        const data = response2.data.list;

        setLocationData(data);

        const typeCount = {};
        data.forEach((item) => {
          const type = item.type;
          typeCount[type] = (typeCount[type] || 0) + 1;
        });
        const typeChartData = Object.keys(typeCount).map((type) => ({
          type,
          value: typeCount[type],
        }));
        setTypeData(typeChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const locationCount = {};
  locationData.forEach((item) => {
    const location = item.location;
    locationCount[location] = (locationCount[location] || 0) + 1;
  });

  const locationChartData = Object.keys(locationCount).map((location) => ({
    name: location,
    value: locationCount[location],
  }));

  const locationChartConfig = {
    data: locationChartData,
    height: 300,
    xField: 'name',
    yField: 'value',
    columnStyle: {
      fill: '#1890ff',
    },
  };
  console.log({ locationChartData });
  console.log({ typeData });
  const typeChartConfig = {
    appendPadding: 10,
    data: typeData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    height: 300,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title="安装地点" style={{ height: 400 }}>
          <Column {...locationChartConfig} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="电梯类型" style={{ height: 400 }}>
          <Pie {...typeChartConfig} />
        </Card>
      </Col>
    </Row>
  );
};

export default Page;
