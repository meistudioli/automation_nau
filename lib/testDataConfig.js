module.exports = {
    ITEM: {
    	buyNow: {
    		basic: {
    			// mid: '100026041234',
                mid: '100050053776',
    			title: '[New Auction] 測試商品請勿下標，所有訂單一律取消(mia)',
    			saleQuantity: 999,
    			salePrice: 100,
    			description: '測試賣場僅提供測試人員使用，商品內容與商品皆為測試使用，訂單皆為無效訂單',
                midForGallery: '100021873486'
    		},
	        violatie: {
	            mid: '100035692788',
	            title: '測試商品請勿購買，訂單一律無效',
	            saleQuantity: 5,
	            salePrice: 99,
	            description: '[詳細介紹] 測試商品請勿購買，訂單一律無效'         
	        },  
            noSpec: {
                mid: '100035332185',
                title: '[NewAuction][無規] 測試商品請勿下標, 所有訂單一律取消 (devin)',
                saleQuantity: 1,
                salePrice: 100,
                description: '',
                status: '二手品'
            },
            singleSpec: {
                mid: '100019179789',
                title: '[單規][NewAuc][Prod][全家/7-11店到店][151] 測試商品請勿下標, 所有訂單一律取消',
                saleQuantity: 961,
                salePrice: 10,
                description: '[單規][NewAuc][Prod][全家/7-11店到店][151] 測試商品請勿下標, 所有訂單一律取消',
                specName: ['單一規格'],
                status: '全新品',
                location: '新北市',
                itemNumber: 'ad1'
            },
            ISBN: {
                mid: '100021873486',
                isbn: '9789863204411'
            },
            presale: {
                mid: '100036731350',
                shippingRule: /付款完成後\d+天/
            },
            presaleSpecificDate: {
                mid: '100036734767',
                shippingRule: /\d{4}\/\d{2}\/\d{2}/
            },
            discount: {
                mid: '100021873486'
            },
            nonRecommdationAndStoreID: {
                mid: '100038346974'
            },
            nonRecommdationWithStoreID: {
                mid: '100038396291'
            },
            recommdationWithStoreID: {
                mid: '100038909663'
            },
            multiSpec: {
                mid: '100032872063',
                title: '[NewAuction] 測試商品請勿下標, 所有訂單一律取消 (Deivn 多規)',
                saleQuantity: 55,
                salePrice: 10,
                description: '[NewAuction] 測試商品請勿下標, 所有訂單一律取消 (Deivn 多規)',
                specName: ['大小','顏色'],
                specItemName: ['雪','中'],
                status: '全新品'
            },  
            defultSubtitle: {
                mid: '100035379599',
                title: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy auto)',
                subTitle: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy auto)',
                saleQuantity: 1,
                salePrice: 1,
                description: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy)'         
            },  
            noSubtitle: {
                mid: '100035337423',
                title: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy auto)',
                subTitle: '',
                saleQuantity: 1,
                salePrice: 1,
                description: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy)'         
            },
            useItemRule: {
                mid: '100035379599',
                title: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy auto)',
                subTitle: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy auto)',
                saleQuantity: 1,
                salePrice: 1,
                shipFee: '7-ELEVEN超取 - 單件運費$60、消費滿$999免運費,全家取貨付款 - 單件運費$60、消費滿$999免運費,宅配貨運 - 單件運費$80、消費滿$1500免運費,面交自取 - 免運費,低溫配送 - 單件運費$150、消費滿$675免運費,郵>寄掛號 - 單件>運費$1、滿2件或消費滿$1111免運費',
                description: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy)'
            },
            usePreferenceRule: {
                mid: '100035337423',
                title: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy auto)',
                subTitle: '',
                saleQuantity: 1,
                salePrice: 1,
                shipFee: '宅配/貨運 - 免運費,低溫配送 - 免運費,全家取貨付款 - 免運費,7-ELEVEN取貨付款 - 免運費,面交/自取/不寄送 - 免運費',
                description: '[New Auction] 測試商品請勿下標，所有訂單一律取消(tommy)'
            },
            favorStoreA: {
                mid: '100039868230'
            },
            favorStoreB: {
                //滿額 
                mid: '100039271225',
                promoteType: '滿額',
                promoteTitle: '滿 100 折 10 元'
            },
            favorStoreC: {
                //滿件
                mid: '100038909663',
                promoteType: '滿件',
                promoteTitle: '滿2 件折 10 元'
            },
            QnA: {
                mid: '100043960319',
                owner: 'tw_ecp_qe9'
            }
    	},
    	bidding: {
    		basic: {
    			mid: '100036241966',
    			title: '[New Auction][競標]測試使用商品請勿購買訂單一律無效',
    			saleQuantity: 999,
    			salePrice: 1000,
    			description: '[New Auction][競標]測試使用商品請勿購買訂單一律無效' 
    		}
    	}
    },
    getItem: function (id) {
        s = id.replace(/\[(\w+)\]/g, '.$1');
        s = s.replace(/^\./, ''); 
        var a = s.split('.');
        var res = this.ITEM;
        while (a.length) {
            var n = a.shift();
            if (n in res) {
                res = res[n];
            } else {
                return;
            }
        }
        return res;
    }
};
