import React, {useState} from 'react';
import {AppRegistry, View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {VictoryChart, VictoryLine, VictoryBar, VictoryArea, VictoryTheme, VictoryAxis} from 'victory-native';

const {width} = Dimensions.get('window');

const InteractiveChartApp = () => {
  const [chartType, setChartType] = useState('line');

  const data = [
    {x: 'Jan', y: 30}, {x: 'Feb', y: 45}, {x: 'Mar', y: 35}, 
    {x: 'Apr', y: 55}, {x: 'May', y: 50}, {x: 'Jun', y: 70}
  ];

  const salesData = [
    {x: 1, y: 2000}, {x: 2, y: 3000}, {x: 3, y: 2500}, 
    {x: 4, y: 4000}, {x: 5, y: 3500}, {x: 6, y: 5000}
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Analytics Dashboard</Text>
        <Text style={styles.headerSubtitle}>Interactive Charts with Victory</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Chart Type Selector */}
        <View style={styles.chartTypeContainer}>
          <ChartTypeButton 
            icon="📈" 
            label="Line" 
            active={chartType === 'line'} 
            onPress={() => setChartType('line')} 
          />
          <ChartTypeButton 
            icon="📊" 
            label="Bar" 
            active={chartType === 'bar'} 
            onPress={() => setChartType('bar')} 
          />
          <ChartTypeButton 
            icon="🌊" 
            label="Area" 
            active={chartType === 'area'} 
            onPress={() => setChartType('area')} 
          />
        </View>

        {/* Main Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Revenue</Text>
          <VictoryChart theme={VictoryTheme.material} width={width - 40} height={250}>
            <VictoryAxis style={{tickLabels: {fontSize: 12, fill: '#666'}}} />
            <VictoryAxis dependentAxis style={{tickLabels: {fontSize: 12, fill: '#666'}}} />
            
            {chartType === 'line' && (
              <VictoryLine 
                data={data} 
                style={{data: {stroke: '#4A90E2', strokeWidth: 3}}}
                animate={{duration: 500}}
              />
            )}
            
            {chartType === 'bar' && (
              <VictoryBar 
                data={data} 
                style={{data: {fill: '#50C878'}}}
                animate={{duration: 500}}
              />
            )}
            
            {chartType === 'area' && (
              <VictoryArea 
                data={data} 
                style={{data: {fill: 'rgba(255, 107, 157, 0.6)', stroke: '#FF6B9D', strokeWidth: 2}}}
                animate={{duration: 500}}
              />
            )}
          </VictoryChart>
        </View>

        {/* Sales Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sales Growth</Text>
          <VictoryChart theme={VictoryTheme.material} width={width - 40} height={200}>
            <VictoryBar 
              data={salesData} 
              style={{data: {fill: ({datum}) => datum.y > 3000 ? '#4A90E2' : '#9B59B6'}}}
              animate={{duration: 1000}}
              cornerRadius={5}
            />
          </VictoryChart>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard icon="💰" title="Revenue" value="$45.2K" change="+12.5%" positive />
          <StatCard icon="👥" title="Users" value="1,234" change="+8.2%" positive />
          <StatCard icon="📦" title="Orders" value="567" change="-3.1%" positive={false} />
          <StatCard icon="⭐" title="Rating" value="4.8" change="+0.3" positive />
        </View>
      </ScrollView>
    </View>
  );
};

const ChartTypeButton = ({icon, label, active, onPress}) => (
  <TouchableOpacity 
    style={[styles.chartTypeBtn, active && styles.chartTypeBtnActive]} 
    onPress={onPress}
    activeOpacity={0.7}>
    <Text style={styles.chartTypeIcon}>{icon}</Text>
    <Text style={[styles.chartTypeLabel, active && styles.chartTypeLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const StatCard = ({icon, title, value, change, positive}) => (
  <View style={styles.statCard}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={[styles.statChange, positive ? styles.statPositive : styles.statNegative]}>
      {change}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f7fa'},
  header: {backgroundColor: '#4A90E2', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 30},
  headerTitle: {fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 5},
  headerSubtitle: {fontSize: 14, color: 'rgba(255,255,255,0.9)'},
  scrollView: {flex: 1},
  chartTypeContainer: {flexDirection: 'row', padding: 15, gap: 10},
  chartTypeBtn: {flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3},
  chartTypeBtnActive: {backgroundColor: '#4A90E2'},
  chartTypeIcon: {fontSize: 24, marginBottom: 5},
  chartTypeLabel: {fontSize: 12, fontWeight: '600', color: '#666'},
  chartTypeLabelActive: {color: '#fff'},
  chartCard: {backgroundColor: '#fff', margin: 15, marginTop: 5, padding: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5},
  chartTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333'},
  statsGrid: {flexDirection: 'row', flexWrap: 'wrap', padding: 10},
  statCard: {width: '48%', backgroundColor: '#fff', margin: '1%', padding: 20, borderRadius: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3},
  statIcon: {fontSize: 32, marginBottom: 10},
  statTitle: {fontSize: 12, color: '#999', marginBottom: 5},
  statValue: {fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5},
  statChange: {fontSize: 14, fontWeight: '600'},
  statPositive: {color: '#50C878'},
  statNegative: {color: '#FF6B6B'},
});

AppRegistry.registerComponent('InteractiveChartApp', () => InteractiveChartApp);
export default InteractiveChartApp;

