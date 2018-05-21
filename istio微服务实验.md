# istio微服务实验

### 简介

本实验，通过在k8s上部署istio，实现微服务的基础功能。其中会涉及到服务的限流，超时，熔断，降级，流量分隔，A/B测试等功能。实验之前需要安装k8s和istio，请参考之前文章。

本实验的服务问调用关系如下：

> 本实验采用时下流行的前后端完全分离模式，
>
> 前端项目基于vue/react实现，
>
> 前端调用python实现的API接口，
>
> python服务调用后端go语言实现的服务
>
> js---->python---->go
>
> vue/react---->python2/3---->go1.10/1.9

### 下载需要的文件

```sh
git clone https://github.com/mgxian/istio-test
```

### 在k8s上部署服务

```sh
cd istio-test
kubectl apply -f service/go/v1/go-v1.yml
kubectl apply -f service/go/v2/go-v2.yml
kubectl apply -f service/python/v1/python-v1.yml
kubectl apply -f service/python/v2/python-v2.yml
kubectl apply -f service/js/v1/js-v1.yml
kubectl apply -f service/js/v2/js-v2.yml
```

### 暴露js和python服务让外部访问

```sh
kubectl apply -f istio/ingress-python.yml
kubectl apply -f istio/ingress-js.yml
```

### 测试访问

```sh
# 配置hosts解析
# 11.11.11.112为其中一个node的ip
11.11.11.112 istio-test.will

# 使用curl
curl -I istio-test.will
curl -s istio-test.will | egrep "vue|React"

# 此时如果作用浏览器，可能会出会页面显示不正常的情况。
# 因为此时请求会轮流分发到后端js服务的v1/v2版本，因此css/js并不能正常加载
```

### 流量管理

根据请求的信息，把流量导向不同的版本。

#### 把所有流量导向v1版本

```sh
# 创建规则
istioctl create -f istio/route-rule-all-v1.yml

# 查看规则
istioctl get routerule

# 访问浏览器测试
http://istio-test.will/

# 此时你会看到react app的界面
# 点击发射按钮，会发送ajax请求到python服务
# 由于把所有流量都导向了v1版本
# 多次点击发射按钮会得到一样的内容
# react----->Python2.7.15----->Gogo1.9.6

# 清除规则
istioctl delete -f istio/route-rule-all-v1.yml
```

#### 根据请求把流量导向不同版本（A/B测试）

```sh
# 创建新规则
# 根据浏览器的不同返回不同内容
istioctl create -f istio/route-rule-js-by-agent.yml

# 使用访问浏览器
# 如果你用chrome浏览器你会看到react app的界面
# 如果你用firefox浏览器你会看到vue app的界面
# 多次点击发射按钮，会获取到不同的内容


# 根据前端app不同使用不同版本的python服务
istioctl create -f istio/route-rule-python-by-header.yml

# 此步骤创建的规则保留不删除，为下面做实验提供方便
```

#### 根据源服务把流量导向不同版本

```sh
# 创建规则
istioctl create -f istio/route-rule-go-by-source.yml

# 此时规则如下
# 所有chrome浏览器都走v1版本服务
# 所有firefox浏览器都走v2版本服务
# react----->Python2.7.15----->Gogo1.9.6
# vue----->Python3.6.5----->Gogo1.10.2

# 清除规则
istioctl delete -f istio/route-rule-go-by-source.yml
```

#### 指定权重进行流量分隔

```sh
# 创建规则
istioctl create -f istio/route-rule-go-v1-v2.yaml

# 清除规则
istioctl delete -f istio/route-rule-go-v1-v2.yaml
```

### 故障管理

- 调用超时设置和重试设置
- 故障注入，模式服务故障

### 超时和重试

```sh
# 创建规则
istioctl create -f istio/route-rule-python-timeout-retry.yml
```

### 故障注入

```sh
# 设置服务延时及异常
istioctl create -f route-rule-go-delay-abort.yml
```

### 清理

```sh
# 删除相关deploy和svc
kubectl delete -f service/go/v1/go-v1.yml
kubectl delete -f service/go/v2/go-v2.yml
kubectl delete -f service/python/v1/python-v1.yml
kubectl delete -f service/python/v2/python-v2.yml
kubectl delete -f service/js/v1/js-v1.yml
kubectl delete -f service/js/v2/js-v2.yml

# 清除规则

```

### 参考文档

- http://istio.doczh.cn
- https://istio.io/docs

- https://istio.io/docs/reference/config/istio.networking.v1alpha3.html
- https://istio.io/docs/reference/config/istio.routing.v1alpha1.html

